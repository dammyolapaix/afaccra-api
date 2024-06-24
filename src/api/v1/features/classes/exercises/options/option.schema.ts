import { boolean, pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'
import users from '../../../users/user.schema'
import exerciseQuestions from '../questions/question.schema'
import { relations } from 'drizzle-orm'

const exerciseQuestionOptions = pgTable('exercise_question_options', {
  id: uuid('id').primaryKey().defaultRandom().notNull(),
  title: varchar('title', { length: 256 }),
  isAnswer: boolean('is_answer').default(false),
  questionId: uuid('question_id')
    .references(() => exerciseQuestions.id)
    .notNull(),
  userId: uuid('user_id')
    .references(() => users.id)
    .notNull(),
  createdAt: timestamp('created_at', { mode: 'string' }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'string' }).defaultNow(),
})

export const exerciseQuestionOptionsRelations = relations(
  exerciseQuestionOptions,
  ({ one }) => ({
    user: one(users, {
      fields: [exerciseQuestionOptions.userId],
      references: [users.id],
    }),
    question: one(exerciseQuestions, {
      fields: [exerciseQuestionOptions.questionId],
      references: [exerciseQuestions.id],
    }),
  })
)

export default exerciseQuestionOptions
