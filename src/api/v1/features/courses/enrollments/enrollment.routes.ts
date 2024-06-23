import express from 'express'
import { authenticatedMiddleware } from '../../users/auth'
import { validationMiddleware } from '../../../middlewares'
import { enrollCourseHandler, enrollCourseMiddleware } from '.'
import { singleCoursePurchaseMiddleware } from '../purchases'

const router = express.Router({ mergeParams: true })

router.route('/:purchaseId').post(
  authenticatedMiddleware,
  // validationMiddleware(createCoursePriceValidation),
  singleCoursePurchaseMiddleware,
  enrollCourseMiddleware,
  enrollCourseHandler
)

export default router
