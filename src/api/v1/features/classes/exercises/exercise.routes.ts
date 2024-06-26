import express from 'express'
import {
  createExerciseHandler,
  createExerciseMiddleware,
  createExerciseValidation,
  deleteExerciseByIdHandler,
  getExercisesHandler,
  getSingleExerciseByIdHandler,
  singleExerciseMiddleware,
  updateExerciseByIdHandler,
} from '.'
import { validationMiddleware } from '../../../middlewares'
import { singleClassMiddleware } from '../class.middlewares'

const router = express.Router({ mergeParams: true })

router
  .route('/')
  .get(getExercisesHandler)
  .post(
    validationMiddleware(createExerciseValidation),
    singleClassMiddleware,
    createExerciseMiddleware,
    createExerciseHandler
  )

router
  .route('/:exerciseId')
  .get(singleExerciseMiddleware, getSingleExerciseByIdHandler)
  .patch(singleExerciseMiddleware, updateExerciseByIdHandler)
  .delete(singleExerciseMiddleware, deleteExerciseByIdHandler)

export default router
