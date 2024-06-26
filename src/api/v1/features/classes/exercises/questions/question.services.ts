import { QuestionType, NewQuestionType } from '.'
import { db } from '../../../../db'
import exerciseQuestions from './question.schema'
import { eq } from 'drizzle-orm'

export const getQuestions = async () =>
  await db.query.exerciseQuestions.findMany({
    with: { exercise: true, user: { columns: { password: false } } },
  })

export const createQuestion = async (question: NewQuestionType) => {
  const newQuestion = await db
    .insert(exerciseQuestions)
    .values(question)
    .returning()
  return newQuestion[0]
}

export const getSingleQuestionById = async ({ id }: Pick<QuestionType, 'id'>) =>
  await db.query.exerciseQuestions.findFirst({
    where: eq(exerciseQuestions.id, id),
    with: { exercise: true, user: { columns: { password: false } } },
  })

export const updateQuestionById = async (
  questionId: string,
  questionToBeUpdated: Partial<QuestionType>
) => {
  const updatedQuestion = await db
    .update(exerciseQuestions)
    .set(questionToBeUpdated)
    .where(eq(exerciseQuestions.id, questionId))
    .returning()

  return updatedQuestion[0]
}

export const deleteQuestionById = async (questionId: string) =>
  await db.delete(exerciseQuestions).where(eq(exerciseQuestions.id, questionId))
