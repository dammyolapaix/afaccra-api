import express from 'express'
import {
  createCourseHandler,
  createCourseValidation,
  getCoursesHandler,
  getSingleCourseByQueryHandler,
  getSingleCourseByQueryMiddleware,
  updateCourseByIdHandler,
} from '.'
import { checkDuplicateCourseMiddleware } from '.'
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
  .get(getCoursesHandler)
  .post(
    authenticatedMiddleware,
    staffOnlyOrAboveRouteMiddleware,
    validationMiddleware(createCourseValidation),
    checkDuplicateCourseMiddleware,
    createCourseHandler
  )

router
  .route('/:identifier')
  .get(getSingleCourseByQueryMiddleware, getSingleCourseByQueryHandler)
  .patch(
    authenticatedMiddleware,
    staffOnlyOrAboveRouteMiddleware,
    getSingleCourseByQueryMiddleware,
    checkDuplicateCourseMiddleware,
    updateCourseByIdHandler
  )

export default router
