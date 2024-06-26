import express from 'express'
import {
  createOptionHandler,
  createOptionMiddleware,
  createOptionValidation,
  deleteOptionByIdHandler,
  getOptionsHandler,
  getSingleOptionByIdHandler,
  singleOptionMiddleware,
  updateOptionByIdHandler,
} from '.'
import { validationMiddleware } from '../../../../middlewares'
import { singleQuestionMiddleware } from '../questions'

const router = express.Router({ mergeParams: true })

router
  .route('/')
  .get(getOptionsHandler)
  .post(
    validationMiddleware(createOptionValidation),
    singleQuestionMiddleware,
    createOptionMiddleware,
    createOptionHandler
  )

router
  .route('/:optionId')
  .get(singleOptionMiddleware, getSingleOptionByIdHandler)
  .patch(
    singleOptionMiddleware,
    singleQuestionMiddleware,
    updateOptionByIdHandler
  )
  .delete(singleOptionMiddleware, deleteOptionByIdHandler)

export default router
