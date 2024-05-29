import { createTRPCRouter } from "~/server/api/trpc";
import { extractDocument } from "../document/extractDocument";
import { uploadDocument } from "../document/uploadDocument";

export const documentRouter = createTRPCRouter({
  uploadDocument,
  extractDocument,
});
