import { pgTable, time, timestamp, uuid } from 'drizzle-orm/pg-core'
import courses from '../course.schema'
import { relations } from 'drizzle-orm'

const courseSchedules = pgTable('course_schedules', {
  id: uuid('id').primaryKey().defaultRandom().notNull(),
  courseId: uuid('course_id')
    .references(() => courses.id)
    .notNull(),
  time: time('time').notNull(),
  createdAt: timestamp('created_at', { mode: 'string' }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'string' }).defaultNow(),
})

export const courseSchedulesRelations = relations(
  courseSchedules,
  ({ one }) => ({
    course: one(courses, {
      fields: [courseSchedules.courseId],
      references: [courses.id],
    }),
  })
)

export default courseSchedules
