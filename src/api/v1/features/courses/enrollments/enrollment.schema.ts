import { pgTable, timestamp, uuid } from 'drizzle-orm/pg-core'
import coursePurchases from '../purchases/purchase.schema'
import courses from '../course.schema'
import { relations } from 'drizzle-orm'
import users from '../../users/user.schema'

const courseEnrollments = pgTable('course_enrollments', {
  id: uuid('id').primaryKey().defaultRandom().notNull(),
  userId: uuid('user_id')
    .references(() => users.id)
    .notNull(),
  courseId: uuid('course_id')
    .references(() => courses.id)
    .notNull(),
  coursePurchaseId: uuid('course_purchase_id')
    .references(() => coursePurchases.id)
    .notNull(),
  enrolledAt: timestamp('enrolled_at', { mode: 'string' }).notNull(),
  createdAt: timestamp('created_at', { mode: 'string' }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'string' }).defaultNow(),
})

export const courseEnrollmentsRelations = relations(
  courseEnrollments,
  ({ one }) => ({
    user: one(users, {
      fields: [courseEnrollments.userId],
      references: [users.id],
    }),
    course: one(courses, {
      fields: [courseEnrollments.courseId],
      references: [courses.id],
    }),
    coursePurchase: one(courses, {
      fields: [courseEnrollments.coursePurchaseId],
      references: [courses.id],
    }),
  })
)

export default courseEnrollments
