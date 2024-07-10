import { NextFunction, Request, Response } from 'express'
import {
  ClassQueryType,
  ClassType,
  NewClassType,
  SingleClassRequestType,
  createClass,
  getClasses,
  updateClassById,
} from '.'
import { asyncHandler } from '../../middlewares'

export const getClassesHandler = asyncHandler(
  async (
    req: Request<{}, {}, {}, ClassQueryType>,
    res: Response,
    next: NextFunction
  ) => {
    const classes = await getClasses(req.query)

    res.status(200).json({ success: true, count: classes.length, classes })
  }
)

export const createClassHandler = asyncHandler(
  async (
    req: Request<{}, {}, NewClassType, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const newClass = await createClass(req.body)

    res.status(200).json({ success: true, class: newClass })
  }
)

export const getSingleClassByIdHandler = asyncHandler(
  async (req: SingleClassRequestType, res: Response, next: NextFunction) =>
    res.status(200).json({ success: true, class: req.class! })
)

export const updateClassByIdHandler = asyncHandler(
  async (
    req: Request<{ classId: ClassType['id'] }, {}, NewClassType, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const updatedClass = await updateClassById(req.params.classId, req.body)

    res.status(200).json({ success: true, class: updatedClass })
  }
)
