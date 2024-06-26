import { createInsertSchema } from 'drizzle-zod'
import { z, object } from 'zod'
import exerciseQuestionOptions from './option.schema'

const createOptionSchema = createInsertSchema(exerciseQuestionOptions, {
  userId: z.string().optional(),
  title: z
    .string({
      required_error: 'error.class.option.title_required',
    })
    .trim()
    .min(3, {
      message: 'error.class.option.titleEn_3_min',
    }),
  questionId: z.string({
    required_error: 'error.class.option.question.required',
  }),
})

const createOptionBody = {
  body: createOptionSchema,
}

export const createOptionValidation = object({
  ...createOptionBody,
})
