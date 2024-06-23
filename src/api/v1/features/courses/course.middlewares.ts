import { NextFunction, Request, Response } from 'express'
import { asyncHandler } from '../../middlewares'
import {
  CourseType,
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
    const { titleEn, titleFr } = req.body

    if (titleEn) {
      req.body.slugEn = slugify(titleEn, { lower: true })

      const courseExist = await getSingleCourseByQuery({
        slugEn: req.body.slugEn,
      })

      if (courseExist)
        return next(
          new ErrorResponse(req.t('error.course.titleEn_exists'), 400)
        )
    }

    if (titleFr) {
      req.body.slugFr = slugify(titleFr, { lower: true })

      const courseExist = await getSingleCourseByQuery({
        slugFr: req.body.slugFr,
      })

      if (courseExist)
        return next(
          new ErrorResponse(req.t('error.course.titleFr_exists'), 400)
        )
    }

    req.body.userId = req.user!.id

    next()
  }
)

export const getSingleCourseByQueryMiddleware = asyncHandler(
  async (
    req: SingleCourseByQueryRequestType,
    res: Response,
    next: NextFunction
  ) => {
    const { identifier, courseId } = req.params

    const query: Partial<Pick<CourseType, 'id' | 'slugEn' | 'slugFr'>> = {}

    switch (req.query.identifier) {
      case undefined:
        query.id = identifier
        break
      case 'id':
        query.id = identifier
        break
      case 'slugEn':
        query.slugEn = identifier
        break
      case 'slugFr':
        query.slugFr = identifier
        break

      default:
        break
    }

    const course = await getSingleCourseByQuery(
      courseId ? { id: courseId } : query
    )

    if (course === undefined)
      return next(new ErrorResponse(req.t('error.course.not_found'), 404))

    req.course = course

    next()
  }
)
