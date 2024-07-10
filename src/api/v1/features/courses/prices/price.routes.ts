import express from 'express'
import { authenticatedMiddleware } from '../../users/auth'
import { getSingleCourseByQueryMiddleware } from '..'
import {
  createCoursePriceHandler,
  coursePriceMiddleware,
  createCoursePriceValidation,
  updateCoursePriceHandler,
  updateCoursePriceValidation,
  getCoursePricesHandler,
  getCoursePriceQuerySchema,
} from '.'
import { validationMiddleware } from '../../../middlewares'

const router = express.Router({ mergeParams: true })

router
  .route('/')
  .get(validationMiddleware(getCoursePriceQuerySchema), getCoursePricesHandler)
  .post(
    authenticatedMiddleware,
    validationMiddleware(createCoursePriceValidation),
    getSingleCourseByQueryMiddleware,
    coursePriceMiddleware,
    createCoursePriceHandler
  )

router
  .route('/:priceId')
  .patch(
    authenticatedMiddleware,
    validationMiddleware(updateCoursePriceValidation),
    getSingleCourseByQueryMiddleware,
    coursePriceMiddleware,
    updateCoursePriceHandler
  )

export default router
