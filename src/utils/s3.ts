/**
 * AWS S3 utility functions for remotely fetching content, using @aws-sdk/client-s3
 *
 * The following env-vars are required:
 *
 * - AWS_ENDPOINT
 * - AWS_REGION
 * - AWS_ACCESS_KEY_ID
 * - AWS_SECRET_ACCESS_KEY
 * - AWS_BUCKET
 * - AWS_PUBLIC_URL
 */

import { S3 } from "@aws-sdk/client-s3";
import { ListObjectsCommand, GetObjectCommand } from "@aws-sdk/client-s3";

export const revalidate = 3600;

/**
 * Helper to create an S3 client with our credentials
 *
 * @returns S3 client
 */
const createS3Client = () => {
  return new S3({
    forcePathStyle: false,
    endpoint: process.env.AWS_ENDPOINT || "",
    region: process.env.AWS_REGION || "",
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
    },
  });
};

const streamToString = (stream): Promise<string> => {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    stream.on("data", (chunk) => chunks.push(chunk));
    stream.on("error", reject);
    stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
  });
};

/**
 * Get a list of all objects in the S3 bucket
 *
 */
const getS3Keys = async (): Promise<string[]> => {
  console.debug("Fetching all S3 keys");
  const s3Client = createS3Client();

  const s3Data = await s3Client.send(
    new ListObjectsCommand({
      Bucket: process.env.AWS_BUCKET,
    }),
  );

  if (s3Data.Contents) {
    return Object.values(s3Data.Contents)
      .filter((obj) => typeof obj.Key !== "undefined")
      .map((obj) => <string>obj.Key);
  }
  return [];
};

/**
 * Get the actual file content of a key in a bucket
 *
 * @param key
 */
const getS3Object = async (key: string): Promise<string> => {
  console.debug(`Fetching S3 object for key: ${key}`);
  const s3Client = createS3Client();
  const s3Data = await s3Client.send(
    new GetObjectCommand({
      Bucket: process.env.AWS_BUCKET,
      Key: key,
    }),
  );

  return streamToString(s3Data.Body);
};

export { getS3Keys, getS3Object };
