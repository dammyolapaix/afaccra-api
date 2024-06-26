import { z } from 'zod'
import { deleteS3ObjectSchema, s3UploadPresignedSchema } from '.'

export type S3UploadPresignedType = z.infer<typeof s3UploadPresignedSchema>

export type DeleteS3ObjectType = z.infer<typeof deleteS3ObjectSchema>
