import { relations } from 'drizzle-orm'
import { date, pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'
import courses from '../course.schema'
import coursePurchases from '../purchases/purchase.schema'

const cohorts = pgTable('cohorts', {
  id: uuid('id').primaryKey().defaultRandom().notNull(),
  startDate: date('start_date'),
  endDate: date('end_date'),
  name: varchar('name', { length: 256 }),
  duration: varchar('duration', { length: 256 }),
  courseId: uuid('course_id')
    .references(() => courses.id)
    .notNull(),
  createdAt: timestamp('created_at', { mode: 'string' }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'string' }).defaultNow(),
})

export const cohortsRelations = relations(cohorts, ({ one, many }) => ({
  course: one(courses, {
    fields: [cohorts.courseId],
    references: [courses.id],
  }),
  purchases: many(coursePurchases),
}))

export default cohorts
