import { NextFunction, Request, Response } from 'express'
import {
  NewQuestionType,
  getSingleQuestionById,
  SingleQuestionRequestType,
} from '.'
import { asyncHandler } from '../../../../middlewares'
import { ErrorResponse } from '../../../../utils'

export const createQuestionMiddleware = asyncHandler(
  async (
    req: Request<{}, {}, NewQuestionType, {}>,
    res: Response,
    next: NextFunction
  ) => {
    req.body.userId = req.user!.id

    next()
  }
)

export const singleQuestionMiddleware = asyncHandler(
  async (req: SingleQuestionRequestType, res: Response, next: NextFunction) => {
    const { questionId: id } = req.params

    const question = await getSingleQuestionById({ id })

    if (question === undefined)
      return next(
        new ErrorResponse(req.t('error.class.question.not_found'), 404)
      )

    req.question = question

    next()
  }
)
