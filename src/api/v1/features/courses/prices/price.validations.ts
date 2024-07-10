import { createInsertSchema } from 'drizzle-zod'
import { z, object } from 'zod'
import coursePrices from './price.schema'

/**
 * Create course price
 */
const createCoursePriceSchema = createInsertSchema(coursePrices, {
  courseId: z.string().uuid(),
  amount: z.number({ required_error: 'error.course.price.required' }),
  levelId: z.string().optional(),
  child: z.string().optional(),
}).refine(
  ({ levelId, child }) => {
    if ((!levelId && !child) || (levelId && child)) return false
    return true
  },
  {
    message: 'The levelId or the child is required. Only one of them',
  }
)

const createCoursePriceBody = {
  body: createCoursePriceSchema,
}

export const createCoursePriceValidation = object({
  ...createCoursePriceBody,
})

/**
 * Update course price
 */
const updateCoursePriceSchema = createInsertSchema(coursePrices, {
  courseId: z.string().uuid().optional(),
  amount: z.number().optional(),
})

const updateCoursePriceBody = {
  body: updateCoursePriceSchema,
}

const updateCoursePriceParams = {
  params: object({
    courseId: z.string().uuid().optional(),
    priceId: z.string().uuid(),
  }),
}

export const updateCoursePriceValidation = object({
  ...updateCoursePriceParams,
  ...updateCoursePriceBody,
})
