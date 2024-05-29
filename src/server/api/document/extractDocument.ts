import { z } from "zod";
import {
  downloadFileWithPrefix,
  extractPdfDocument,
} from "~/utils/gcloudUtils";
import { publicProcedure } from "../trpc";

export const extractDocument = publicProcedure
  .input(z.object({ fileKey: z.string() }))
  .mutation(async ({ input }) => {
    const fileName = input.fileKey;
    const extractFileName = `${fileName}_extract`;

    // Extract
    await extractPdfDocument(fileName, extractFileName);
    // Take the extract from cloud and store in database
    const extractedData = await downloadFileWithPrefix(extractFileName);

    return extractedData;
  });
