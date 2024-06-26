import { OptionType, NewOptionType } from '.'
import { db } from '../../../../db'
import { eq } from 'drizzle-orm'
import exerciseQuestionOptions from './option.schema'

export const getOptions = async () =>
  await db.query.exerciseQuestionOptions.findMany({
    with: { question: true, user: { columns: { password: false } } },
  })

export const createOption = async (option: NewOptionType) => {
  const newOption = await db
    .insert(exerciseQuestionOptions)
    .values(option)
    .returning()
  return newOption[0]
}

export const getSingleOptionById = async ({ id }: Pick<OptionType, 'id'>) =>
  await db.query.exerciseQuestionOptions.findFirst({
    where: eq(exerciseQuestionOptions.id, id),
    with: { question: true, user: { columns: { password: false } } },
  })

export const updateOptionById = async (
  optionId: string,
  optionToBeUpdated: Partial<OptionType>
) => {
  const updatedOption = await db
    .update(exerciseQuestionOptions)
    .set(optionToBeUpdated)
    .where(eq(exerciseQuestionOptions.id, optionId))
    .returning()

  return updatedOption[0]
}

export const deleteOptionById = async (optionId: string) =>
  await db
    .delete(exerciseQuestionOptions)
    .where(eq(exerciseQuestionOptions.id, optionId))
