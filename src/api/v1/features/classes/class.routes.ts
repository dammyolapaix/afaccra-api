import express from 'express'
import {
  createClassHandler,
  createClassMiddleware,
  createClassValidation,
  getClassesHandler,
  getSingleClassByIdHandler,
  singleClassMiddleware,
  updateClassByIdHandler,
} from '.'
import { validationMiddleware } from '../../middlewares'

const router = express.Router()

router
  .route('/')
  .get(getClassesHandler)
  .post(
    validationMiddleware(createClassValidation),
    createClassMiddleware,
    createClassHandler
  )

router
  .route('/:classId')
  .get(singleClassMiddleware, getSingleClassByIdHandler)
  .patch(singleClassMiddleware, updateClassByIdHandler)

export default router
