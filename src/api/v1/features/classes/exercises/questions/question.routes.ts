import express from 'express'
import {
  createQuestionHandler,
  createQuestionMiddleware,
  createQuestionValidation,
  deleteQuestionByIdHandler,
  getQuestionsHandler,
  getSingleQuestionByIdHandler,
  singleQuestionMiddleware,
  updateQuestionByIdHandler,
} from '.'
import { validationMiddleware } from '../../../../middlewares'
import { singleExerciseMiddleware } from '../exercise.middlewares'

const router = express.Router({ mergeParams: true })

router
  .route('/')
  .get(getQuestionsHandler)
  .post(
    validationMiddleware(createQuestionValidation),
    singleExerciseMiddleware,
    createQuestionMiddleware,
    createQuestionHandler
  )

router
  .route('/:questionId')
  .get(singleQuestionMiddleware, getSingleQuestionByIdHandler)
  .patch(
    singleQuestionMiddleware,
    singleExerciseMiddleware,
    updateQuestionByIdHandler
  )
  .delete(singleQuestionMiddleware, deleteQuestionByIdHandler)

export default router
