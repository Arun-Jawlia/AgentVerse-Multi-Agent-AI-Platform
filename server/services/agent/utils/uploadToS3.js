import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "../config/s3.js";

export const uploadToS3 = async (filename, buffer, contentType) => {
  try {
    if (!filename) {
      throw new Error("S3 upload filename is required");
    }

    await s3.send(
      new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Body: buffer,
        Key: filename,
        ContentType: contentType,
      }),
    );

    return filename;
  } catch (error) {
    console.log("Upload to S3", error);
    throw error;
  }
};
