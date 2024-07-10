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
  priceId: z.string({
    required_error: 'error.class.price.required',
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

/**
 * Query
 */

export const getClassQuerySchema = z.object({
  courseId: z.string().uuid().optional(),
})
const query = {
  query: getClassQuerySchema,
}
export const getClassValidation = object({
  ...query,
})
