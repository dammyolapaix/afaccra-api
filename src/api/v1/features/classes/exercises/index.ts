import {
  createExerciseMiddleware,
  singleExerciseMiddleware,
} from './exercise.middlewares'
import { createExerciseValidation } from './exercise.validations'
import {
  NewExerciseType,
  SingleExerciseRequestType,
  ExerciseType,
} from './exercise.types'
import {
  createExercise,
  getSingleExerciseById,
  getExercises,
  updateExerciseById,
  deleteExerciseById,
} from './exercise.services'
import {
  createExerciseHandler,
  getExercisesHandler,
  getSingleExerciseByIdHandler,
  updateExerciseByIdHandler,
  deleteExerciseByIdHandler,
} from './exercise.controllers'
import exerciseRoutes from './exercise.routes'

export { createExerciseMiddleware, singleExerciseMiddleware }
export { createExerciseValidation }
export { NewExerciseType, SingleExerciseRequestType, ExerciseType }
export {
  createExercise,
  getSingleExerciseById,
  getExercises,
  updateExerciseById,
  deleteExerciseById,
}
export {
  createExerciseHandler,
  getExercisesHandler,
  getSingleExerciseByIdHandler,
  updateExerciseByIdHandler,
  deleteExerciseByIdHandler,
}
export { exerciseRoutes }
