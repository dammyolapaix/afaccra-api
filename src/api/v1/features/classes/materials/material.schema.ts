import { pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import users from '../../users/user.schema'
import classes from '../class.schema'
import classTopics from '../topics/topic.schema'

const classMaterials = pgTable('class_materials', {
  id: uuid('id').primaryKey().defaultRandom().notNull(),
  titleEn: varchar('title_en', { length: 256 }),
  titleFr: varchar('title_fr', { length: 256 }),
  descriptionEn: text('description_en'),
  descriptionFr: text('description_fr'),
  userId: uuid('user_id')
    .references(() => users.id)
    .notNull(),
  classId: uuid('class_id')
    .references(() => classes.id)
    .notNull(),
  topicId: uuid('topic_id').references(() => classTopics.id),
  createdAt: timestamp('created_at', { mode: 'string' }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'string' }).defaultNow(),
})

export const classMaterialsRelations = relations(classMaterials, ({ one }) => ({
  class: one(classes, {
    fields: [classMaterials.classId],
    references: [classes.id],
  }),
  user: one(users, {
    fields: [classMaterials.userId],
    references: [users.id],
  }),
  topic: one(classTopics, {
    fields: [classMaterials.topicId],
    references: [classTopics.id],
  }),
}))

export default classMaterials
