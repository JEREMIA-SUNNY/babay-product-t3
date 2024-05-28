import { initTRPC } from "@trpc/server";
import { z } from "zod";
import { convertBase64ToFile } from "~/utils/fileUtils";
import { getSignedUrl, uploadFile } from "~/utils/gcloudUtils";

const t = initTRPC.context().create();

export const appRouter = t.router({
  uploadFile: t.procedure
    .input(z.object({ base64: z.string() })) // Input validation
    .mutation(async ({ input }) => {
      try {
        const { buffer, fileName, contentType } = await convertBase64ToFile(
          input.base64,
        );

        await uploadFile(buffer, fileName, contentType);
        const signedUrl = await getSignedUrl(fileName, 3600); // URL valid for 1 hour

        return {
          size: buffer.length,
          mimeType: contentType,
          signedUrl,
        };
      } catch (error) {
        console.error("Error uploading file:", error);
        throw new Error("Failed to upload the file");
      }
    }),
});
