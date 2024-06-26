import { createInsertSchema } from 'drizzle-zod'
import { z, object } from 'zod'
import classAttachments from './attachment.schema'

const createAttachmentSchema = createInsertSchema(classAttachments, {
  userId: z.string().optional(),
  link: z.string().url().optional(),
  awsS3Key: z.string().optional(),
  awsS3PresignedUrl: z.string().optional(),
  awsS3PresignedUrlExpiresAt: z.string().datetime().optional(),
  size: z.number().optional(),
  contentType: z.string().optional(),
  materialId: z
    .string({
      required_error: 'error.class.exercise.class.required',
    })
    .optional(),
  exerciseId: z
    .string({
      required_error: 'error.class.exercise.class.required',
    })
    .optional(),
})

const createAttachmentBody = {
  body: createAttachmentSchema,
}

export const createAttachmentValidation = object({
  ...createAttachmentBody,
})
