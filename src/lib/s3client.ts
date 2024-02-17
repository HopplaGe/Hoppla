import { S3Client } from "@aws-sdk/client-s3";


const globalS3client = global as unknown as { s3client?: S3Client }

export const s3client = globalS3client.s3client || new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
    }
})

if (process.env.NODE_ENV !== 'production') globalS3client.s3client = s3client

export default s3client