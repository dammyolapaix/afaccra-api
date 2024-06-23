import express from 'express'
import { authenticatedMiddleware } from '../../users/auth'
import { getSingleCourseByQueryMiddleware } from '..'
import {
  createCourseScheduleHandler,
  courseScheduleMiddleware,
  createCourseScheduleValidation,
  updateCourseScheduleHandler,
  updateCourseScheduleValidation,
} from '.'
import { validationMiddleware } from '../../../middlewares'

const router = express.Router({ mergeParams: true })

router
  .route('/')
  .post(
    authenticatedMiddleware,
    validationMiddleware(createCourseScheduleValidation),
    getSingleCourseByQueryMiddleware,
    courseScheduleMiddleware,
    createCourseScheduleHandler
  )

router
  .route('/:scheduleId')
  .patch(
    authenticatedMiddleware,
    validationMiddleware(updateCourseScheduleValidation),
    getSingleCourseByQueryMiddleware,
    courseScheduleMiddleware,
    updateCourseScheduleHandler
  )

export default router
