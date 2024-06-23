import express from 'express'
import { authenticatedMiddleware } from '../../users/auth'
import { validationMiddleware } from '../../../middlewares'
import {
  coursePurchaseMiddleware,
  purchaseCourseHandler,
  verifyCoursePurchaseHandler,
  singleCoursePurchaseMiddleware,
} from '.'

const router = express.Router({ mergeParams: true })

router.route('/').post(
  authenticatedMiddleware,
  // validationMiddleware(createCoursePriceValidation),
  coursePurchaseMiddleware,
  purchaseCourseHandler
)

router.route('/:purchaseId/verify').get(
  authenticatedMiddleware,
  // validationMiddleware(updateCoursePriceValidation),
  singleCoursePurchaseMiddleware,
  verifyCoursePurchaseHandler
)

export default router
