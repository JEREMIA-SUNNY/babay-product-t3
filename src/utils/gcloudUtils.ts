import { Storage } from "@google-cloud/storage";
import vision from "@google-cloud/vision";
import { env } from "~/env";

type GoogleApiKey = {
  type: string;
  project_id: string;
  private_key_id: string;
  private_key: string;
  client_email: string;
  client_id: string;
  auth_uri: string;
  token_uri: string;
  auth_provider_x509_cert_url: string;
  client_x509_cert_url: string;
  universe_domain: string;
};

const bucketName = env.BUCKET_NAME;

let googleApiKey: GoogleApiKey | null = null;

try {
  googleApiKey = JSON.parse(env.GOOGLE_API_KEY);
} catch (error) {
  console.error("Error parsing GOOGLE_API_KEY:", error);
}

if (!googleApiKey) {
  throw new Error("Invalid GOOGLE_API_KEY in environment variables");
}

const config = {
  credentials: googleApiKey,
};

const storage = new Storage(config);

export async function uploadFile(
  fileBuffer: Buffer,
  destFileName: string,
  contentType: string,
  generationMatchPrecondition?: number,
) {
  const options = {
    destination: destFileName,
    metadata: {
      contentType,
    },
    preconditionOpts: generationMatchPrecondition
      ? { ifGenerationMatch: generationMatchPrecondition }
      : undefined,
  };

  try {
    const bucket = storage.bucket(bucketName);
    const file = bucket.file(destFileName);

    // Use the 'save' method to upload the buffer
    await file.save(fileBuffer, options);
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
}

export async function getSignedUrl(
  fileKey: string,
  expirationTime: number,
): Promise<string> {
  try {
    const [url] = await storage
      .bucket(bucketName)
      .file(fileKey)
      .getSignedUrl({
        version: "v4",
        action: "read",
        expires: Date.now() + expirationTime * 1000,
      });

    return url;
  } catch (error) {
    console.error("Error generating signed URL:", error);
    throw error;
  }
}

export async function downloadFileWithPrefix(prefix: string) {
  const bucket = storage.bucket(bucketName);
  const [files] = await bucket.getFiles({
    prefix,
  });

  let fullDocumentData = "";

  for (const file of files) {
    const [data] = await file.download();
    const responseObject = JSON.parse(data.toString()) as {
      responses: { fullTextAnnotation?: { text: string } }[];
    };

    let combinedText = "";

    for (const response of responseObject.responses) {
      if (response.fullTextAnnotation) {
        combinedText += response.fullTextAnnotation.text;
      }
    }

    fullDocumentData += combinedText + "\n";
  }

  return fullDocumentData;
}

export async function extractPdfDocument(
  fileName: string,
  extractFileName: string,
) {
  const client = new vision.ImageAnnotatorClient(config);

  const gcsSourceUri = `gs://${bucketName}/${fileName}`;
  const gcsDestinationUri = `gs://${bucketName}/${extractFileName}`;

  // Extract the data
  const [operation] = await client.asyncBatchAnnotateFiles({
    requests: [
      {
        inputConfig: {
          mimeType: "application/pdf",
          gcsSource: {
            uri: gcsSourceUri,
          },
        },
        outputConfig: {
          gcsDestination: {
            uri: gcsDestinationUri,
          },
        },
        features: [
          {
            type: "DOCUMENT_TEXT_DETECTION",
          },
        ],
      },
    ],
  });

  await operation.promise();
}
