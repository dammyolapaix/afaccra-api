import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'
import users from '../users/user.schema'
import courses from '../courses/course.schema'
import { relations } from 'drizzle-orm'
import levels from '../levels/level.schema'

const classes = pgTable('classes', {
  id: uuid('id').primaryKey().defaultRandom().notNull(),
  nameEn: varchar('name_en', { length: 256 }).unique(),
  nameFr: varchar('name_fr', { length: 256 }).unique(),
  userId: uuid('user_id')
    .references(() => users.id)
    .notNull(),
  courseId: uuid('course_id')
    .references(() => courses.id)
    .notNull(),
  levelId: uuid('course_id')
    .references(() => levels.id)
    .notNull(),
  createdAt: timestamp('created_at', { mode: 'string' }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'string' }).defaultNow(),
})

export const classesRelations = relations(classes, ({ one }) => ({
  user: one(users, {
    fields: [classes.userId],
    references: [users.id],
  }),
  course: one(courses, {
    fields: [classes.courseId],
    references: [courses.id],
  }),
  level: one(levels, {
    fields: [classes.levelId],
    references: [levels.id],
  }),
}))

export default classes
