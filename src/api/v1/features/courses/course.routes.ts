import express from 'express'
import {
  createCourseHandler,
  createCourseValidation,
  getCourseQueryValidation,
  getCoursesHandler,
  getSingleCourseByQueryHandler,
  getSingleCourseByQueryMiddleware,
  updateCourseByIdHandler,
} from '.'
import { courseMiddleware } from '.'
import {
  authenticatedMiddleware,
  staffOnlyOrAboveRouteMiddleware,
} from '../users/auth'
import { validationMiddleware } from '../../middlewares'
import { coursePurchaseRoutes } from './purchases'

const router = express.Router()

router.use('/purchases', coursePurchaseRoutes)

router
  .route('/')
  .get(validationMiddleware(getCourseQueryValidation), getCoursesHandler)
  .post(
    authenticatedMiddleware,
    staffOnlyOrAboveRouteMiddleware,
    validationMiddleware(createCourseValidation),
    courseMiddleware,
    createCourseHandler
  )

router
  .route('/:identifier')
  .get(getSingleCourseByQueryMiddleware, getSingleCourseByQueryHandler)
  .patch(
    authenticatedMiddleware,
    staffOnlyOrAboveRouteMiddleware,
    getSingleCourseByQueryMiddleware,
    courseMiddleware,
    updateCourseByIdHandler
  )

export default router
