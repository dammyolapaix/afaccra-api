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
    req: Request<{ classId: ClassType['id'] }, {}, {}, {}> & {
      class: ClassType
    },
    res: Response,
    next: NextFunction
  ) => {
    const { classId: id } = req.params

    const classExists = await getSingleClassById({ id })

    if (classExists === undefined)
      return next(new ErrorResponse(req.t('error.class.not_found'), 404))

    req.class = classExists

    next()
  }
)
