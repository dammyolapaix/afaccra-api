import { createInsertSchema } from 'drizzle-zod'
import { z, object } from 'zod'
import coursePrices from './price.schema'

/**
 * Create course price
 */
const createCoursePriceSchema = createInsertSchema(coursePrices, {
  courseId: z.string().optional(),
  amount: z.number({ required_error: 'error.course.price.required' }),
})

const createCoursePriceBody = {
  body: createCoursePriceSchema,
}

const createCoursePriceParams = {
  params: object({
    courseId: z.string(),
  }),
}

export const createCoursePriceValidation = object({
  ...createCoursePriceParams,
  ...createCoursePriceBody,
})

/**
 * Update course price
 */
const updateCoursePriceSchema = createInsertSchema(coursePrices, {
  courseId: z.string().optional(),
  amount: z.number().optional(),
})

const updateCoursePriceBody = {
  body: updateCoursePriceSchema,
}

const updateCoursePriceParams = {
  params: object({
    courseId: z.string().uuid(),
    priceId: z.string().uuid(),
  }),
}

export const updateCoursePriceValidation = object({
  ...updateCoursePriceParams,
  ...updateCoursePriceBody,
})
