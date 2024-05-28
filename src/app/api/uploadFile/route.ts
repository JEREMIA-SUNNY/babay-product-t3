import { convertBase64ToFile } from "../../../utils/fileUtils";
import { getSignedUrl, uploadFile } from "../../../utils/gcloudUtils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { base64 } = await req.json();

    if (!base64) {
      return NextResponse.json(
        { error: "No file data provided" },
        { status: 400 },
      );
    }

    const { buffer, fileName, contentType } = await convertBase64ToFile(base64);

    await uploadFile(buffer, fileName, contentType);
    const signedUrl = await getSignedUrl(fileName, 3600); // URL valid for 1 hour

    return NextResponse.json({
      size: buffer.length,
      mimeType: contentType,
      signedUrl,
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json(
      { error: "Failed to upload the file" },
      { status: 500 },
    );
  }
}
