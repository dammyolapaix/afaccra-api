import { ExerciseType, NewExerciseType } from '.'
import { db } from '../../../db'
import classExercises from './exercise.schema'
import { eq } from 'drizzle-orm'

export const getExercises = async () =>
  await db.query.classExercises.findMany({
    with: { class: true, user: { columns: { password: false } } },
  })

export const createExercise = async (exercise: NewExerciseType) => {
  const newExercise = await db
    .insert(classExercises)
    .values(exercise)
    .returning()
  return newExercise[0]
}

export const getSingleExerciseById = async ({ id }: Pick<ExerciseType, 'id'>) =>
  await db.query.classExercises.findFirst({
    where: eq(classExercises.id, id),
    with: { class: true, user: { columns: { password: false } } },
  })

export const updateExerciseById = async (
  exerciseId: string,
  exerciseToBeUpdated: Partial<ExerciseType>
) => {
  const updatedExercise = await db
    .update(classExercises)
    .set(exerciseToBeUpdated)
    .where(eq(classExercises.id, exerciseId))
    .returning()

  return updatedExercise[0]
}

export const deleteExerciseById = async (exerciseId: string) =>
  await db.delete(classExercises).where(eq(classExercises.id, exerciseId))
