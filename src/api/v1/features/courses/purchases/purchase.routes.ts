import express from 'express'
import { validationMiddleware } from '../../../middlewares'
import {
  coursePurchaseMiddleware,
  enrollCourseMiddleware,
  singleCoursePurchaseMiddleware,
  purchaseCourseHandler,
  verifyCoursePurchaseHandler,
  enrollCourseHandler,
  purchaseCourseValidation,
  enrollCourseValidation,
} from '.'
import { singleClassMiddleware } from '../../classes'
import { singleCohortMiddleware } from '../cohorts'

const router = express.Router()

router
  .route('/')
  .post(
    validationMiddleware(purchaseCourseValidation),
    singleClassMiddleware,
    singleCohortMiddleware,
    coursePurchaseMiddleware,
    purchaseCourseHandler
  )

router
  .route('/:purchaseId')
  .patch(
    validationMiddleware(enrollCourseValidation),
    singleCoursePurchaseMiddleware,
    enrollCourseMiddleware,
    enrollCourseHandler
  )

router
  .route('/:purchaseId/verify')
  .get(
    validationMiddleware(enrollCourseValidation),
    singleCoursePurchaseMiddleware,
    verifyCoursePurchaseHandler
  )

export default router
