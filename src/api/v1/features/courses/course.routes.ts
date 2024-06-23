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
import { authenticatedMiddleware } from '../users/auth'
import { validationMiddleware } from '../../middlewares'
import { coursePriceRoutes } from './prices'
import { courseScheduleRoutes } from './schedules'
import { coursePurchaseRoutes } from './purchases'

const router = express.Router()

router.use('/purchases', coursePurchaseRoutes)
router.use('/:courseId/prices', coursePriceRoutes)
router.use('/:courseId/schedules', courseScheduleRoutes)

router
  .route('/')
  .get(getCoursesHandler)
  .post(
    authenticatedMiddleware,
    validationMiddleware(createCourseValidation),
    checkDuplicateCourseMiddleware,
    createCourseHandler
  )

router
  .route('/:identifier')
  .get(getSingleCourseByQueryMiddleware, getSingleCourseByQueryHandler)
  .patch(
    authenticatedMiddleware,
    getSingleCourseByQueryMiddleware,
    checkDuplicateCourseMiddleware,
    updateCourseByIdHandler
  )

export default router
