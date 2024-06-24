import {
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core'
import users from '../../users/user.schema'
import classes from '../class.schema'
import classTopics from '../topics/topic.schema'
import { relations } from 'drizzle-orm'

const classExercises = pgTable('class_exercises', {
  id: uuid('id').primaryKey().defaultRandom().notNull(),
  titleEn: varchar('title_en', { length: 256 }),
  titleFr: varchar('title_fr', { length: 256 }),
  instructionEn: text('instruction_en'),
  instructionFr: text('instruction_fr'),
  points: integer('points'),
  due: timestamp('due', { mode: 'string' }),
  userId: uuid('user_id')
    .references(() => users.id)
    .notNull(),
  classId: uuid('class_id')
    .references(() => classes.id)
    .notNull(),
  topicId: uuid('class_topic_id').references(() => classTopics.id),
  createdAt: timestamp('created_at', { mode: 'string' }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'string' }).defaultNow(),
})

export const classExercisesRelations = relations(classExercises, ({ one }) => ({
  user: one(users, {
    fields: [classExercises.userId],
    references: [users.id],
  }),
  class: one(classes, {
    fields: [classExercises.classId],
    references: [classes.id],
  }),
  topic: one(classTopics, {
    fields: [classExercises.topicId],
    references: [classTopics.id],
  }),
}))

export default classExercises
