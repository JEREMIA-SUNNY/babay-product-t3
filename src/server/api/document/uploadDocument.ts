import { z } from "zod";
import { convertBase64ToFile } from "~/utils/fileUtils";
import { getSignedUrl, uploadFile } from "~/utils/gcloudUtils";
import { publicProcedure } from "../trpc";

export const uploadDocument = publicProcedure
  .input(z.object({ base64: z.string() }))
  .mutation(async ({ input }) => {
    const { buffer, fileName, contentType } = await convertBase64ToFile(
      input.base64,
    );

    await uploadFile(buffer, fileName, contentType);

    return {
      fileName,
    };
  });
