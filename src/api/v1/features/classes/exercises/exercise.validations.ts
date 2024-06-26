import { createInsertSchema } from 'drizzle-zod'
import { z, object } from 'zod'
import exercises from './exercise.schema'

const createExerciseSchema = createInsertSchema(exercises, {
  userId: z.string().optional(),
  titleEn: z
    .string()
    .trim()
    .min(3, {
      message: 'error.class.exercise.titleEn_3_min',
    })
    .optional(),
  titleFr: z
    .string()
    .min(3, {
      message: 'error.class.exercise.titleFr_3_min',
    })
    .optional(),
  classId: z.string({
    required_error: 'error.class.exercise.class.required',
  }),
}).refine(
  ({ titleEn, titleFr }) => {
    if (!titleEn && !titleFr) return false
    return true
  },
  {
    message: 'error.class.exercise.title_required',
  }
)

const createExerciseBody = {
  body: createExerciseSchema,
}

export const createExerciseValidation = object({
  ...createExerciseBody,
})
