import OpenAI from "openai";
import { env } from "~/env";

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

export interface ChecklistItem {
  question: string;
  status: boolean;
}

export interface DocumentSummaryResponse {
  summary: string;
  checklist: ChecklistItem[];
}

function isDocumentSummaryResponse(obj: any): obj is DocumentSummaryResponse {
  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof obj.summary === "string" &&
    Array.isArray(obj.checklist) &&
    obj.checklist.every(
      (item: any) =>
        typeof item === "object" &&
        typeof item.question === "string" &&
        typeof item.status === "boolean",
    )
  );
}

export async function getDocumentSummary(
  ocrOutput: string,
  checklist: string[],
): Promise<DocumentSummaryResponse> {
  const questions = checklist.join("\n  * ");

  const prompt = `**Document:**

${ocrOutput}

**Checklist Questions:**

  * ${questions}

Analyze the content of the uploaded document based on the checklist questions and provide a concise summary in a natural paragraph format not exceeding 750 characters. Avoid using markdown formatting and refer to the document as "the document."

Additionally, based on the identified issues, suggest changes to the document so that it complies with the provided checklist in another paragraph not exceeding 750 characters. Avoid using markdown formatting and refer to the document as "the document."

After that, answer the checklist questions with true or false based on the content of the document. Format the output as a JSON object with the following structure:
{
  "summary": "summary of the document",
  "checklist": [
    { "question": "first question", "status": true/false },
    { "question": "second question", "status": true/false },
    // Continue for all checklist questions
  ]
}

Ensure that the status for each checklist question accurately reflects whether the document satisfies that specific question (true if satisfied, false if not).
  `;

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

  // Handle cases where the output contains extraneous characters
  const jsonStartIndex = response.indexOf("{");
  const jsonEndIndex = response.lastIndexOf("}") + 1;

  if (jsonStartIndex === -1 || jsonEndIndex === -1) {
    throw new Error("JSON structure not found in the response");
  }

  const jsonResponseString = response.slice(jsonStartIndex, jsonEndIndex);

  // Parse response and validate
  let jsonResponse: any;
  try {
    jsonResponse = JSON.parse(jsonResponseString);
  } catch (error) {
    throw new Error("Failed to parse JSON response");
  }

  if (isDocumentSummaryResponse(jsonResponse)) {
    return jsonResponse;
  } else {
    throw new Error("Invalid response format");
  }
}
