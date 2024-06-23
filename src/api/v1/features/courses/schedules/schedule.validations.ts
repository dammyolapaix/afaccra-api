import { createInsertSchema } from 'drizzle-zod'
import { z, object } from 'zod'
import courseSchedules from './schedule.schema'

/**
 * Create course schedule
 */
const createCourseScheduleSchema = createInsertSchema(courseSchedules, {
  courseId: z.string().optional(),
  time: z.string().time(),
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
    courseId: z.string(),
    scheduleId: z.string().uuid(),
  }),
}

export const updateCourseScheduleValidation = object({
  ...updateCourseScheduleParams,
  ...createCourseScheduleBody,
})
