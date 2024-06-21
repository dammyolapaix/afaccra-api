import { NextFunction, Request, Response } from 'express'
import { asyncHandler } from '../../middlewares'

import {
  NewCourseType,
  SingleCourseByQueryRequestType,
  createCourse,
  deleteCourseById,
  getCourses,
  updateCourseById,
} from '.'

export const createCourseHandler = asyncHandler(
  async (
    req: Request<{}, {}, NewCourseType, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const course = await createCourse(req.body)

    res.status(201).json({ success: true, course })
  }
)

export const getSingleCourseByQueryHandler = asyncHandler(
  async (
    req: SingleCourseByQueryRequestType,
    res: Response,
    next: NextFunction
  ) => res.status(200).json({ success: true, course: req.course })
)

export const getCoursesHandler = asyncHandler(
  async (req: Request<{}, {}, {}, {}>, res: Response, next: NextFunction) => {
    const courses = await getCourses()

    res.status(200).json({ success: true, count: courses.length, courses })
  }
)

export const updateCourseByIdHandler = asyncHandler(
  async (
    req: Request<{ identifier: string }, {}, NewCourseType, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const course = await updateCourseById(req.params.identifier, req.body)

    res.status(200).json({ success: true, course })
  }
)

export const deleteCourseByIdHandler = asyncHandler(
  async (
    req: Request<{ identifier: string }, {}, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    await deleteCourseById(req.params.identifier)

    res.status(200).json({ success: true })
  }
)
