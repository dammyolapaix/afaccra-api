import { Request } from 'express'
import { z } from 'zod'
import coursePrices from './price.schema'
import { CourseType } from '..'
import { getCoursePriceQuerySchema } from '.'

export type CoursePriceType = typeof coursePrices.$inferSelect
export type NewCoursePriceType = typeof coursePrices.$inferInsert

export type CoursePriceRequestType = Request<
  { courseId: string; priceId?: string },
  {},
  NewCoursePriceType,
  {}
> & {
  course: CourseType
}
export type CoursePriceQueryType = z.infer<typeof getCoursePriceQuerySchema>
