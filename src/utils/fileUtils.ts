export const convertFileToBase64 = async (file: File): Promise<string> => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  const output = await new Promise<string>((resolve, reject) => {
    reader.onload = function () {
      const output = reader.result?.toString();
      if (output) {
        resolve(output);
        reject("Error while convert the file into base64 format");
      }
    };
    reader.onerror = () => {
      reject("Error while convert the file into base64 format");
    };
  });

  return output;
};

const extendsionMap: Record<string, string> = {
  "vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
  "vnd.openxmlformats-officedocument.presentationml.presentation": "pptx",
  "vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xlsx",
  "x-zip-compressed": "zip",
  "x-compressed": "rar",
  "image/svg+xml": "svg",
  "svg+xml": "svg",
  jpg: "jpg",
  jpeg: "jpeg",
  png: "png",
  pdf: "pdf",
  mp4: "mp4",
  svg: "svg",
};

type ConvertBase64ToFileOutputShape = {
  buffer: Buffer;
  fileName: string;
  contentType: string;
};

export const convertBase64ToFile = (base64: string) =>
  new Promise<ConvertBase64ToFileOutputShape>((resolve, reject) => {
    const [mimeType, byte] = base64.split(",");

    if (mimeType && byte) {
      if (btoa(atob(byte)) == byte) {
        const contentType = mimeType?.split(":")[1]?.split(";")[0];
        const extension = extendsionMap[contentType?.split("/")[1] ?? "-"];

        if (extension && contentType) {
          // const fileName = `${Date.now().toString()}.${extension}`;
          const fileName = `${Date.now().toString()}`;
          const buffer = Buffer.from(byte, "base64");
          resolve({
            buffer,
            fileName,
            contentType,
          });
        } else {
          reject("Unsupported file type");
        }
      }
    }

    reject("File is not base64");
  });
