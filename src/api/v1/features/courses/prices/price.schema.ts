import { relations } from 'drizzle-orm'
import { integer, pgEnum, pgTable, timestamp, uuid } from 'drizzle-orm/pg-core'
import courses from '../course.schema'
import levels from '../../levels/level.schema'
import classes from '../../classes/class.schema'

export const courseChildPriceEnum = pgEnum('course_child_price', [
  '1st child',
  '2nd child',
  '3rd child',
])

const coursePrices = pgTable('course_prices', {
  id: uuid('id').primaryKey().defaultRandom().notNull(),
  courseId: uuid('course_id')
    .references(() => courses.id)
    .notNull(),
  levelId: uuid('level_id').references(() => levels.id),
  child: courseChildPriceEnum('child'),
  amount: integer('amount').notNull(),
  createdAt: timestamp('created_at', { mode: 'string' }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'string' }).defaultNow(),
})

export const coursePricesRelations = relations(
  coursePrices,
  ({ one, many }) => ({
    course: one(courses, {
      fields: [coursePrices.courseId],
      references: [courses.id],
    }),
    level: one(levels, {
      fields: [coursePrices.levelId],
      references: [levels.id],
    }),
    price: many(classes),
  })
)

export default coursePrices
