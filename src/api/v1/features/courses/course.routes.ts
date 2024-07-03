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
import { coursePriceRoutes } from './prices'
import { courseScheduleRoutes } from './schedules'
import { coursePurchaseRoutes } from './purchases'
import { courseEnrollmentRoutes } from './enrollments'

const router = express.Router()

router.use('/purchases', coursePurchaseRoutes)
router.use('/enrollments', courseEnrollmentRoutes)
router.use('/:courseId/prices', coursePriceRoutes)
router.use('/:courseId/schedules', courseScheduleRoutes)

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
