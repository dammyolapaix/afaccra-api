import express from 'express'
import {
  createClassHandler,
  createClassMiddleware,
  createClassValidation,
  getClassesHandler,
  getClassValidation,
  getSingleClassByIdHandler,
  singleClassMiddleware,
  updateClassByIdHandler,
} from '.'
import { validationMiddleware } from '../../middlewares'
import { topicRoutes } from './topics'

const router = express.Router()

router.use('/:classId/topics', topicRoutes)

router
  .route('/')
  .get(validationMiddleware(getClassValidation), getClassesHandler)
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
