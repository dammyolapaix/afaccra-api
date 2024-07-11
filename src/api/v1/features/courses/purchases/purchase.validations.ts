import { z, object } from 'zod'

/**
 * Purchase course schema
 */
const purchaseCourseSchema = object({
  classId: z.string().uuid(),
  cohortId: z.string().uuid(),
})

const purchaseCourseBody = {
  body: purchaseCourseSchema,
}

export const purchaseCourseValidation = object({
  ...purchaseCourseBody,
})

/**
 * Enroll student/user to course
 */
const enrollCourseSchema = object({
  purchaseId: z.string().uuid(),
})

const enrollCourseParams = {
  params: enrollCourseSchema,
}

export const enrollCourseValidation = object({
  ...enrollCourseParams,
})
