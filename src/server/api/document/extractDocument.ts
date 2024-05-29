import { z } from "zod";
import { env } from "~/env";
import {
  downloadFileWithPrefix,
  extractPdfDocument,
} from "~/utils/gcloudUtils";
import { publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

export const extractDocument = publicProcedure
  .input(z.object({ fileKey: z.string(), token: z.string() }))
  .mutation(async ({ input }) => {
    if (input.token === env.AUTH_TOKEN_REQ) {
      const fileName = input.fileKey;
      const extractFileName = `${fileName}_extract`;

      // Extract
      await extractPdfDocument(fileName, extractFileName);
      // Take the extract from cloud and store in database
      const extractedData = await downloadFileWithPrefix(extractFileName);

      return extractedData;
    }
    throw new TRPCError({
      message: "Token error",
      code: "INTERNAL_SERVER_ERROR",
    });
  });
