import { createInsertSchema } from 'drizzle-zod'
import { z, object } from 'zod'
import topics from './topic.schema'

const createTopicSchema = createInsertSchema(topics, {
  userId: z.string().optional(),
  nameEn: z
    .string()
    .trim()
    .min(3, {
      message: 'error.class.topic.nameEn_3_min',
    })
    .optional(),
  nameFr: z
    .string()
    .min(3, {
      message: 'error.class.topic.nameFr_3_min',
    })
    .optional(),
}).refine(
  ({ nameEn, nameFr }) => {
    if (!nameEn && !nameFr) return false
    return true
  },
  {
    message: 'error.class.topic.name_required',
  }
)

const createTopicBody = {
  body: createTopicSchema,
}

const createTopicParams = {
  params: object({
    classId: z.string({
      required_error: 'error.class.topic.class.required',
    }),
  }),
}

export const createTopicValidation = object({
  ...createTopicBody,
  ...createTopicParams,
})
