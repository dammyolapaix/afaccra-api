import { Request } from 'express'
import questions from './question.schema'

export type QuestionType = typeof questions.$inferSelect
export type NewQuestionType = typeof questions.$inferInsert

export type SingleQuestionRequestType = Request<
  { questionId: QuestionType['id'] },
  {},
  {},
  {}
> & {
  question?: QuestionType
}
