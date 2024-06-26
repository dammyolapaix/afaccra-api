import { Request } from 'express'
import exercises from './exercise.schema'

export type ExerciseType = typeof exercises.$inferSelect
export type NewExerciseType = typeof exercises.$inferInsert

export type SingleExerciseRequestType = Request<
  { exerciseId: ExerciseType['id'] },
  {},
  {},
  {}
> & {
  exercise?: ExerciseType
}
