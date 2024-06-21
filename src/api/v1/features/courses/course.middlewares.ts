import { NextFunction, Request, Response } from 'express'
import { asyncHandler } from '../../middlewares'
import {
  NewCourseType,
  SingleCourseByQueryRequestType,
  getSingleCourseByQuery,
} from '.'
import { ErrorResponse } from '../../utils'
import slugify from 'slugify'

export const checkDuplicateCourseMiddleware = asyncHandler(
  async (
    req: Request<{}, {}, NewCourseType, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const { titleEn, titleFr, slugEn, slugFr } = req.body

    if (titleEn) {
      const courseExist = await getSingleCourseByQuery({ identifier: titleEn })

      if (courseExist)
        return next(new ErrorResponse(req.t('error.auth.user_exist'), 400))

      if (slugEn && slugify(titleEn) !== slugEn) {
        const courseExist = await getSingleCourseByQuery({ slugEn })

        if (courseExist)
          return next(new ErrorResponse(req.t('error.auth.user_exist'), 400))
      }
    }

    if (titleFr) {
      const courseExist = await getSingleCourseByQuery({ identifier: titleFr })

      if (courseExist)
        return next(new ErrorResponse(req.t('error.auth.user_exist'), 400))

      if (slugFr && slugify(titleFr) !== slugFr) {
        const courseExist = await getSingleCourseByQuery({ slugFr })

        if (courseExist)
          return next(new ErrorResponse(req.t('error.auth.user_exist'), 400))
      }
    }

    if (titleEn && !slugEn) req.body.slugEn = slugify(titleEn)
    if (titleFr && !slugFr) req.body.slugFr = slugify(titleFr)

    next()
  }
)

export const getSingleCourseByQueryMiddleware = asyncHandler(
  async (
    req: SingleCourseByQueryRequestType,
    res: Response,
    next: NextFunction
  ) => {
    const { identifier } = req.params

    const course = await getSingleCourseByQuery({ identifier })

    if (course === undefined)
      return next(new ErrorResponse(req.t('error.auth.user_exist'), 404))

    if (req.method === 'GET') req.course = course

    next()
  }
)
