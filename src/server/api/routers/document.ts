import { createTRPCRouter } from "~/server/api/trpc";
import { extractDocument } from "../document/extractDocument";
import { uploadDocument } from "../document/uploadDocument";
import { analyzeDocument } from "../document/analyzeDocument";

export const documentRouter = createTRPCRouter({
  uploadDocument,
  extractDocument,
  analyzeDocument,
});
