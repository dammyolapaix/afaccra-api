import { relations } from 'drizzle-orm'
import { integer, pgEnum, pgTable, timestamp, uuid } from 'drizzle-orm/pg-core'
import courses from '../course.schema'

export const courseLevelPriceTypeEnum = pgEnum('course_level_price', [
  'A1/A2',
  'B1/B2',
  'C1/C2',
])

export const courseChildPriceTypeEnum = pgEnum('course_duration_period', [
  '1st child',
  '2nd child',
  '3rd child',
])

const coursePrices = pgTable('course_prices', {
  id: uuid('id').primaryKey().defaultRandom().notNull(),
  courseId: uuid('course_id')
    .references(() => courses.id)
    .notNull(),
  level: courseLevelPriceTypeEnum('level'),
  child: courseChildPriceTypeEnum('child'),
  amount: integer('amount').notNull(),
  createdAt: timestamp('created_at', { mode: 'string' }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'string' }).defaultNow(),
})

export const coursePricesRelations = relations(coursePrices, ({ one }) => ({
  course: one(courses, {
    fields: [coursePrices.courseId],
    references: [courses.id],
  }),
}))

export default coursePrices
