import { NextFunction, Request } from 'express'
import { asyncHandler } from '../../../middlewares'
import {
  CoursePurchaseRequestType,
  CoursePurchaseType,
  getSingleCoursePurchaseById,
} from '.'
import { ErrorResponse } from '../../../utils'
import { getSingleCoursePriceById } from '../prices'

export const coursePurchaseMiddleware = asyncHandler(
  async (req: CoursePurchaseRequestType, res: Response, next: NextFunction) => {
    const { coursePriceId: id } = req.body

    const price = await getSingleCoursePriceById({ id })

    if (price === undefined)
      return next(new ErrorResponse(req.t('error.course.price.not_found'), 404))

    req.body.courseId = price.courseId
    req.body.userId = req.user!.id

    req.amount = price.amount.toString()
    req.email = req.user!.email

    next()
  }
)

export const singleCoursePurchaseMiddleware = asyncHandler(
  async (
    req: Request<{ purchaseId: string }, {}, {}, {}> & {
      purchase?: CoursePurchaseType
    },
    res: Response,
    next: NextFunction
  ) => {
    const { purchaseId: id } = req.params

    const purchase = await getSingleCoursePurchaseById({ id })

    if (purchase === undefined)
      return next(
        new ErrorResponse(req.t('error.course.purchase.not_found'), 404)
      )

    req.purchase = purchase

    next()
  }
)
