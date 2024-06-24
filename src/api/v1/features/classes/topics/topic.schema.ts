import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import users from '../../users/user.schema'
import classes from '../class.schema'

const classTopics = pgTable('class_topics', {
  id: uuid('id').primaryKey().defaultRandom().notNull(),
  nameEn: varchar('name_en', { length: 256 }),
  nameFr: varchar('name_fr', { length: 256 }),
  userId: uuid('user_id')
    .references(() => users.id)
    .notNull(),
  classId: uuid('class_id')
    .references(() => classes.id)
    .notNull(),
  createdAt: timestamp('created_at', { mode: 'string' }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'string' }).defaultNow(),
})

export const classTopicsRelations = relations(classTopics, ({ one }) => ({
  class: one(classes, {
    fields: [classTopics.classId],
    references: [classes.id],
  }),
  user: one(users, {
    fields: [classTopics.userId],
    references: [users.id],
  }),
}))

export default classTopics
