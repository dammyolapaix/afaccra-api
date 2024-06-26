import { NextFunction, Request, Response } from 'express'
import { asyncHandler } from '../../middlewares'
import { ClassType, NewClassType, getSingleClassById } from '.'
import { ErrorResponse } from '../../utils'
import { getSingleCourseByQuery } from '../courses'

export const createClassMiddleware = asyncHandler(
  async (
    req: Request<{}, {}, NewClassType, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const { courseId } = req.body

    req.body.userId = req.user!.id

    const course = await getSingleCourseByQuery({ id: courseId })

    if (course === undefined)
      return next(new ErrorResponse(req.t('error.course.not_found'), 404))

    next()
  }
)

export const singleClassMiddleware = asyncHandler(
  async (
    req: Request<
      { classId?: ClassType['id'] },
      {},
      { classId?: ClassType['id'] },
      {}
    > & {
      class?: ClassType
    },
    res: Response,
    next: NextFunction
  ) => {
    if (req.params.classId) {
      const classExists = await getSingleClassById({ id: req.params.classId })

      if (classExists === undefined)
        return next(new ErrorResponse(req.t('error.class.not_found'), 404))

      req.class = classExists
    }

    if (req.body.classId) {
      const classExists = await getSingleClassById({ id: req.body.classId })

      if (classExists === undefined)
        return next(new ErrorResponse(req.t('error.class.not_found'), 404))

      req.class = classExists
    }

    next()
  }
)
