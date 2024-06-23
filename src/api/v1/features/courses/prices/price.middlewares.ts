import { NextFunction } from 'express'
import { asyncHandler } from '../../../middlewares'
import { CoursePriceRequestType, getSingleCoursePriceById } from '.'
import { ErrorResponse } from '../../../utils'

export const coursePriceMiddleware = asyncHandler(
  async (req: CoursePriceRequestType, res: Response, next: NextFunction) => {
    req.body.courseId = req.course.id

    if (req.method === 'PATCH') {
      const price = await getSingleCoursePriceById({ id: req.params.priceId! })

      if (price === undefined)
        return next(
          new ErrorResponse(req.t('error.course.price.not_found'), 404)
        )

      if (req.body.amount) req.body.amount = req.body.amount * 100
    }

    next()
  }
)
