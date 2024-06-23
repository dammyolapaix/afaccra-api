import { NextFunction, Response } from 'express'
import { asyncHandler } from '../../../middlewares'
import {
  CourseScheduleRequestType,
  createCourseSchedule,
  updateCourseScheduleById,
} from '.'

export const createCourseScheduleHandler = asyncHandler(
  async (req: CourseScheduleRequestType, res: Response, next: NextFunction) => {
    const schedule = await createCourseSchedule(req.body)

    res.status(201).json({ success: true, schedule })
  }
)

export const updateCourseScheduleHandler = asyncHandler(
  async (req: CourseScheduleRequestType, res: Response, next: NextFunction) => {
    const schedule = await updateCourseScheduleById(
      req.params.scheduleId!,
      req.body
    )

    res.status(201).json({ success: true, schedule })
  }
)
