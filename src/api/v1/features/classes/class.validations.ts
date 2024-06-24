import { createInsertSchema } from 'drizzle-zod'
import { z, object } from 'zod'
import classes from './class.schema'

const createClassSchema = createInsertSchema(classes, {
  userId: z.string().optional(),
  nameEn: z
    .string()
    .trim()
    .min(3, {
      message: 'error.class.nameEn_3_min',
    })
    .optional(),
  nameFr: z
    .string()
    .min(3, {
      message: 'error.class.nameFr_3_min',
    })
    .optional(),
  courseId: z.string({
    required_error: 'error.class.course.required',
  }),
}).refine(
  ({ nameEn, nameFr }) => {
    if (!nameEn && !nameFr) return false
    return true
  },
  {
    message: 'error.class.name_required',
  }
)

const createClassBody = {
  body: createClassSchema,
}

export const createClassValidation = object({
  ...createClassBody,
})
