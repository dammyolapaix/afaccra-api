import { NextFunction } from 'express'
import { asyncHandler } from '../../../middlewares'
import { CourseScheduleRequestType, getSingleCourseScheduleById } from '.'
import { ErrorResponse } from '../../../utils'

export const courseScheduleMiddleware = asyncHandler(
  async (req: CourseScheduleRequestType, res: Response, next: NextFunction) => {
    req.body.courseId = req.course.id

    if (req.method === 'PATCH') {
      const schedule = await getSingleCourseScheduleById({
        id: req.params.scheduleId!,
      })

      if (schedule === undefined)
        return next(
          new ErrorResponse(req.t('error.course.schedule.not_found'), 404)
        )
    }

    next()
  }
)
