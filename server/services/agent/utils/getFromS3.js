import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3 } from "../config/s3.js";
import { GetObjectCommand } from "@aws-sdk/client-s3";

export const getFromS3 = async (filename, expiresIn = 24*60) => {
  try {
  return await getSignedUrl(
    s3,
    new GetObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: filename,
    }),
    {
      expiresIn,
    },
  );    
  } catch (error) {
    console.log("Get from s3", error)
  }
};
