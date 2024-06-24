import { S3Client } from '@aws-sdk/client-s3'

const { AWS_S3_BUCKET_REGION, AWS_ACCESS_KEY, AWS_SECRET_ACCESS_KEY } =
  process.env

const s3 = new S3Client({
  credentials: {
    accessKeyId: AWS_ACCESS_KEY!,
    secretAccessKey: AWS_SECRET_ACCESS_KEY!,
  },
  region: AWS_S3_BUCKET_REGION!,
})

export default s3
