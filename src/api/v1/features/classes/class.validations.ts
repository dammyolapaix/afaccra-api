import { createInsertSchema } from 'drizzle-zod'
import { z, object } from 'zod'
import classes from './class.schema'

const createClassSchema = createInsertSchema(classes, {
  userId: z.string().optional(),
  displayOnWebsite: z.coerce.boolean().optional(),
  name: z.string(),
  priceId: z.string({
    required_error: 'error.class.price.required',
  }),
})

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
