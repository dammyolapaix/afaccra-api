import { NextFunction, Request, Response } from 'express'
import {
  ExerciseType,
  NewExerciseType,
  SingleExerciseRequestType,
  createExercise,
  deleteExerciseById,
  getExercises,
  updateExerciseById,
} from '.'
import { asyncHandler } from '../../../middlewares'

export const getExercisesHandler = asyncHandler(
  async (req: Request<{}, {}, {}, {}>, res: Response, next: NextFunction) => {
    const exercises = await getExercises()

    res.status(200).json({ success: true, count: exercises.length, exercises })
  }
)

export const createExerciseHandler = asyncHandler(
  async (
    req: Request<{}, {}, NewExerciseType, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const exercise = await createExercise(req.body)

    res.status(200).json({ success: true, exercise })
  }
)

export const getSingleExerciseByIdHandler = asyncHandler(
  async (req: SingleExerciseRequestType, res: Response, next: NextFunction) =>
    res.status(200).json({ success: true, exercise: req.exercise! })
)

export const updateExerciseByIdHandler = asyncHandler(
  async (
    req: Request<{ exerciseId: ExerciseType['id'] }, {}, NewExerciseType, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const updatedExercise = await updateExerciseById(
      req.params.exerciseId,
      req.body
    )

    res.status(200).json({ success: true, exercise: updatedExercise })
  }
)

export const deleteExerciseByIdHandler = asyncHandler(
  async (
    req: Request<{ identifier: string }, {}, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    await deleteExerciseById(req.params.identifier)

    res.status(200).json({ success: true })
  }
)
