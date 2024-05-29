import { z } from "zod";
import { convertBase64ToFile } from "~/utils/fileUtils";
import { getSignedUrl, uploadFile } from "~/utils/gcloudUtils";
import { publicProcedure } from "../trpc";
import { env } from "~/env";
import { TRPCError } from "@trpc/server";
export const uploadDocument = publicProcedure
  .input(z.object({ base64: z.string(), token: z.string() }))
  .mutation(async ({ input }) => {
    const { buffer, fileName, contentType } = await convertBase64ToFile(
      input.base64,
    );
    if (input.token === env.AUTH_TOKEN_REQ) {
      await uploadFile(buffer, fileName, contentType);

      return {
        fileName,
      };
    }
    throw new TRPCError({
      message: "Token error",
      code: "INTERNAL_SERVER_ERROR",
    });
  });
