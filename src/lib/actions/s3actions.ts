"use server"
import {v4 as uuidv4} from "uuid";
import {PutObjectCommand} from "@aws-sdk/client-s3"
import s3client from "../s3client"

export const uploadImage = async (file: {
    type: "Buffer";
    data: number[];
}, fileName: string) => {
    const buffer = Buffer.from(file.data)
    const uniqueFileName = `${uuidv4()}-${fileName}`;
    await s3client.send(new PutObjectCommand({
        Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
        Key: `userimages/${uniqueFileName}`,
        Body: buffer,
    }))

    return `https://${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}.s3.amazonaws.com/userimages/${encodeURIComponent(uniqueFileName)}`
} 