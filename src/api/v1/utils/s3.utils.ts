import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
} from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { s3 } from '../config'

const { AWS_S3_BUCKET_NAME } = process.env
const Bucket = AWS_S3_BUCKET_NAME!

export const getS3PresignedURL = async ({ Key }: { Key: string }) => {
  const command = new GetObjectCommand({
    Bucket,
    Key,
  })
  const expiresIn = 60 * 60 * 24 * 6 // 6 days
  return await getSignedUrl(s3, command, { expiresIn })
}

export const getS3UploadPresignedURL = async ({
  Key,
  ContentType,
}: {
  Key: string
  ContentType: string
}) => {
  const command = new PutObjectCommand({
    Bucket,
    Key,
    ContentType,
  })
  const expiresIn = 60 * 5 // 5 mins
  return await getSignedUrl(s3, command, { expiresIn })
}

export const deleteS3ObjectByKey = async ({ Key }: { Key: string }) => {
  const command = new DeleteObjectCommand({
    Bucket,
    Key,
  })

  return await s3.send(command)
}
