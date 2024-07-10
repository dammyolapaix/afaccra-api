import { Request } from 'express'
import courses from './course.schema'

export type CourseType = typeof courses.$inferSelect
export type NewCourseType = typeof courses.$inferInsert

export type SingleCourseByQueryRequestType = Request<
  { identifier: string; courseId?: string },
  {},
  { courseId?: string },
  { identifier?: 'id' | 'slugEn' | 'slugFr' }
> & {
  course: CourseType
}
