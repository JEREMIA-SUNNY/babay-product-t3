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

  Based on the content of the document above, please analyze it against the checklist questions and provide a concise summary in a natural paragraph format. Avoid using markdown formatting and refer to the document as "the document."
  
  Additionally, based on the identified issues, suggest recommendations for improvement.

  we need it in two para

    para 1 should contain summary. para 2 should contain recommendations

summary - whats not proper as per the questions asked

recommendations - what can be improved.

put a 500 char limit on both paras

so entire response will be <= 1000 chars
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
