import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { env } from "~/env";
import { generateQuestionsArray } from "~/utils/gptUtil";
import { getDocumentSummary } from "~/utils/openAiUtils";
import { publicProcedure } from "../trpc";

export const analyzeDocument = publicProcedure
  .input(
    z.object({
      ocrOutput: z.string(),
      contractType: z.string(),
      token: z.string(),
    }),
  )
  .mutation(async ({ input }) => {
    if (input.token === env.AUTH_TOKEN_REQ) {
      const checkList = generateQuestionsArray(input.contractType);
      return await getDocumentSummary(input.ocrOutput, checkList);
    }
    throw new TRPCError({
      message: "Token error",
      code: "INTERNAL_SERVER_ERROR",
    });
  });
