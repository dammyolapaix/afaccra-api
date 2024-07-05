import { createInsertSchema } from 'drizzle-zod'
import { z, object } from 'zod'
import courseSchedules from './schedule.schema'

/**
 * Create course schedule
 */
const createCourseScheduleSchema = createInsertSchema(courseSchedules, {
  courseId: z.string().optional(),
  startTime: z.string(),
  endTime: z.string(),
})

const createCourseScheduleBody = {
  body: createCourseScheduleSchema,
}

const createCourseScheduleParams = {
  params: object({
    courseId: z.string(),
  }),
}

export const createCourseScheduleValidation = object({
  ...createCourseScheduleParams,
  ...createCourseScheduleBody,
})

/**
 * Update course schedule
 */

const updateCourseScheduleParams = {
  params: object({
    courseId: z.string().uuid().optional(),
    scheduleId: z.string().uuid(),
  }),
}

export const updateCourseScheduleValidation = object({
  ...updateCourseScheduleParams,
  ...createCourseScheduleBody,
})
