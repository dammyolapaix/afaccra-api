import {
  integer,
  pgEnum,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core'
import classExercises from '../exercise.schema'
import users from '../../../users/user.schema'
import { relations } from 'drizzle-orm'

export const exerciseQuestionTypeEnum = pgEnum('exercise_question_type', [
  'multiple-choice',
  'short-answer',
  'paragraph',
])

const exerciseQuestions = pgTable('exercise_questions', {
  id: uuid('id').primaryKey().defaultRandom().notNull(),
  title: varchar('title', { length: 256 }).notNull(),
  points: integer('points'),
  exerciseId: uuid('exercise_id')
    .references(() => classExercises.id)
    .notNull(),
  userId: uuid('user_id')
    .references(() => users.id)
    .notNull(),
  createdAt: timestamp('created_at', { mode: 'string' }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'string' }).defaultNow(),
})

export const exerciseQuestionsRelations = relations(
  exerciseQuestions,
  ({ one }) => ({
    user: one(users, {
      fields: [exerciseQuestions.userId],
      references: [users.id],
    }),
    exercise: one(classExercises, {
      fields: [exerciseQuestions.exerciseId],
      references: [classExercises.id],
    }),
  })
)

export default exerciseQuestions
