import { createInsertSchema } from 'drizzle-zod'
import { z, object } from 'zod'
import courseSchedules from './schedule.schema'

/**
 * Create course schedule
 */
const createCourseScheduleSchema = createInsertSchema(courseSchedules, {
  courseId: z.string().uuid(),
  startTime: z.string(),
  endTime: z.string(),
})

const createCourseScheduleBody = {
  body: createCourseScheduleSchema,
}

export const createCourseScheduleValidation = object({
  ...createCourseScheduleBody,
})

/**
 * Update course schedule
 */

const updateCourseScheduleParams = {
  params: object({
    scheduleId: z.string().uuid(),
  }),
}

export const updateCourseScheduleValidation = object({
  ...updateCourseScheduleParams,
  ...createCourseScheduleBody,
})
