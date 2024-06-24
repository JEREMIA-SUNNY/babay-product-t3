import OpenAI from "openai";
import { env } from "~/env";

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

export interface ChecklistItem {
  question: string;
  status: boolean;
  reason: string;
}

export interface DocumentSummaryResponse {
  summary: string;
  suggestions: string;
  checklist: ChecklistItem[];
}

function isDocumentSummaryResponse(obj: any): obj is DocumentSummaryResponse {
  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof obj.summary === "string" &&
    typeof obj.suggestions === "string" &&
    Array.isArray(obj.checklist) &&
    obj.checklist.every(
      (item: any) =>
        typeof item === "object" &&
        typeof item.question === "string" &&
        typeof item.status === "boolean" &&
        typeof item.reason === "string",
    )
  );
}

export async function getDocumentSummary(
  ocrOutput: string,
  checklist: string[],
): Promise<DocumentSummaryResponse> {
  const questions = checklist
    .map((q, index) => `${index + 1}. ${q}`)
    .join("\n");

  const prompt = `**Document:**

 *${ocrOutput}

 *Checklist Questions:

${questions}

Task:
1. Summary:
- Analyze the content of the document based on the checklist questions.
- Provide a concise summary of the document, not exceeding 750 characters.

2. Suggestions for Compliance:
- Suggest changes to the document so that it complies with the provided checklist.
- Provide suggestions in a concise paragraph not exceeding 750 characters.

3. Checklist Review:
- For each checklist question, determine if the document meets the requirement (true or false).
- If true, provide an extract from the document used to make this decision (not exceeding 200 characters).
- If false, provide a reason why it does not meet the requirement (not exceeding 200 characters).
- Ensure the answers are specific and accurate, and do not make assumptions beyond the provided document content.
- Be critical in your analysis and do not hesitate to mark requirements as unmet if the document does not fully comply.
- Ensure the checklist responses are accurate and concise

Output Format:

json
{
  "summary": "summary of the document",
  "suggestions": "suggestions for compliance",
  "checklist": [
    { "question": "first question", "status": true/false, "reason": "reason or document extract" },
    { "question": "second question", "status": true/false, "reason": "reason or document extract" },
    // Continue for all checklist questions
  ]
}

Example Output:

json
{
  "summary": "The document outlines the terms and conditions of a service agreement between two parties, covering payment terms, confidentiality, and dispute resolution.",
  "suggestions": "Ensure that the confidentiality clause explicitly states the duration of confidentiality obligations. Add a clause for data protection compliance.",
  "checklist": [
    { "question": "Does the document specify payment terms?", "status": true, "reason": "The payment terms are outlined in Section 3, stating the due date and method of payment." },
    { "question": "Does the document include a confidentiality clause?", "status": false, "reason": "The document lacks a specific clause detailing confidentiality obligations." }
  ]
}

Instructions:
- Provide the summary and suggestions in natural paragraph format.
- Ensure the checklist responses are accurate and concise.
- Cross-check each requirement against the provided document and provide exact matches or clear reasons for non-compliance.
- Be critical in your analysis and do not hesitate to mark requirements as unmet if the document does not fully comply.
- If the document does not contain information relevant to a checklist item, mark it as false and state that the information is not present in the document.
`;

  console.log("Prompt being sent to OpenAI:", prompt);

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "You are an assistant helping with contract validation.",
      },
      { role: "user", content: prompt },
    ],
    model: "gpt-3.5-turbo",
  });

  const response = (completion.choices[0]?.message?.content ?? "").trim();

  console.log("Response from OpenAI:", response);

  // Handle cases where the output contains extraneous characters
  const jsonStartIndex = response.indexOf("{");
  const jsonEndIndex = response.lastIndexOf("}") + 1;

  if (jsonStartIndex === -1 || jsonEndIndex === -1) {
    throw new Error("JSON structure not found in the response");
  }

  const jsonResponseString = response.slice(jsonStartIndex, jsonEndIndex);

  console.log("Extracted JSON string:", jsonResponseString);

  // Parse response and validate
  let jsonResponse: any;
  try {
    jsonResponse = JSON.parse(jsonResponseString);
  } catch (error) {
    console.error("Failed to parse JSON response:", error);
    throw new Error("Failed to parse JSON response");
  }

  console.log("Parsed JSON response:", jsonResponse);

  if (isDocumentSummaryResponse(jsonResponse)) {
    return jsonResponse;
  } else {
    throw new Error("Invalid response format");
  }
}
