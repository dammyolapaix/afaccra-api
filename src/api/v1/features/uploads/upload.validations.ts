import { z } from 'zod'

export const s3UploadPresignedSchema = z.object({
  resource: z.enum(['attachments']),
  fileName: z.string(),
  ContentType: z.string(),
})

export const deleteS3ObjectSchema = z.object({
  resource: z.enum(['attachments']),
  Key: z.string(),
  resourceId: z.string(),
})

const s3UploadPresignedBody = {
  body: s3UploadPresignedSchema,
}

const deleteS3ObjectBody = {
  body: s3UploadPresignedSchema,
}

export const s3UploadPresignedValidation = z.object({
  ...s3UploadPresignedBody,
})

export const deleteS3ObjectValidation = z.object({
  ...deleteS3ObjectBody,
})
