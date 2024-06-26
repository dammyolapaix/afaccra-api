import { createInsertSchema } from 'drizzle-zod'
import { z, object } from 'zod'
import questions from './question.schema'

const createQuestionSchema = createInsertSchema(questions, {
  userId: z.string().optional(),
  title: z
    .string({
      required_error: 'error.class.question.title_required',
    })
    .trim()
    .min(3, {
      message: 'error.class.question.titleEn_3_min',
    }),
  exerciseId: z.string({
    required_error: 'error.class.question.class.required',
  }),
})

const createQuestionBody = {
  body: createQuestionSchema,
}

export const createQuestionValidation = object({
  ...createQuestionBody,
})
