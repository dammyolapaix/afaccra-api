import { Request } from 'express'
import courseSchedules from './schedule.schema'
import { CourseType } from '../course.types'

export type CourseScheduleType = typeof courseSchedules.$inferSelect
export type NewCourseScheduleType = typeof courseSchedules.$inferInsert

export type CourseScheduleRequestType = Request<
  { courseId: string; scheduleId?: string },
  {},
  NewCourseScheduleType,
  {}
> & {
  course: CourseType
}
