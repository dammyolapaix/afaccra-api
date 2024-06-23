import courseEnrollments from './enrollment.schema'

export type CourseEnrollmentType = typeof courseEnrollments.$inferSelect
export type NewCourseEnrollmentType = typeof courseEnrollments.$inferInsert
