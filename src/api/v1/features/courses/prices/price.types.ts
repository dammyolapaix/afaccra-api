import { Request } from 'express'
import coursePrices from './price.schema'
import { CourseType } from '..'

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
