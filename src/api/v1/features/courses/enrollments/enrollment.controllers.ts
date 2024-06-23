import { NextFunction, Request, Response } from 'express'
import { asyncHandler } from '../../../middlewares'
import { NewCourseEnrollmentType, enrollCourse } from '.'

export const enrollCourseHandler = asyncHandler(
  async (
    req: Request<{}, {}, NewCourseEnrollmentType, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const enrollment = await enrollCourse(req.body)

    res.status(201).json({ success: true, enrollment })
  }
)
