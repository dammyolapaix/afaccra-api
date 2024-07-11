import { Request } from 'express'
import { z } from 'zod'
import courses from './course.schema'
import { getCourseQuerySchema } from '.'
import { CoursePriceType } from './prices'
import { CourseScheduleType } from './schedules'
import { CohortType } from './cohorts'

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

export type CourseQueryType = z.infer<typeof getCourseQuerySchema>

export type CourseWithRelationshipsType = CourseType & {
  prices: CoursePriceType[]
  schedules: CourseScheduleType[]
  cohorts: CohortType[]
}
