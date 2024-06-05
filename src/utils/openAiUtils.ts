import OpenAI from "openai";
import { env } from "~/env";

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

export async function getDocumentSummary(
  ocrOutput: string,
  checklist: string[],
) {
  const questions = checklist.join("\n  * ");

  const prompt = `**Document:**

${ocrOutput}

**Checklist Questions:**

  * ${questions}

Analyze the content of the uploaded document based on the checklist questions and provide a concise summary in a natural paragraph format not exceeding 750 characters. Avoid using markdown formatting and refer to the document as "the document."

Additionally, based on the identified issues, suggest changes to the document so that it complies with the provided checklist in another paragraph not exceeding 750 characters. Avoid using markdown formatting and refer to the document as "the document."

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

  return (completion.choices[0]?.message?.content ?? "").trim();
}
