import { createInsertSchema } from 'drizzle-zod'
import { z, object } from 'zod'
import courses from './course.schema'

const createCourseSchema = createInsertSchema(courses, {
  userId: z.string().optional(),
  titleEn: z
    .string()
    .trim()
    .min(3, {
      message: 'error.course.titleEn_3_min',
    })
    .optional(),
  titleFr: z
    .string()
    .min(3, {
      message: 'error.course.titleFr_3_min',
    })
    .optional(),
}).refine(
  ({ titleEn, titleFr }) => {
    if (!titleEn && !titleFr) return false
    return true
  },
  {
    message: 'error.course.title_required',
  }
)

const createCourseBody = {
  body: createCourseSchema,
}

export const createCourseValidation = object({
  ...createCourseBody,
})

export const getCourseQuerySchema = z.object({
  isPublished: z.boolean().optional(),
})

const getCourseQueryBody = {
  query: getCourseQuerySchema,
}

export const getCourseQueryValidation = object({
  ...getCourseQueryBody,
})
