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
    if (req.params.questionId) {
      const question = await getSingleQuestionById({
        id: req.params.questionId,
      })

      if (question === undefined)
        return next(
          new ErrorResponse(req.t('error.class.question.not_found'), 404)
        )

      req.question = question
    }

    if (req.body.questionId) {
      const question = await getSingleQuestionById({
        id: req.body.questionId,
      })

      if (question === undefined)
        return next(
          new ErrorResponse(req.t('error.class.question.not_found'), 404)
        )
    }

    next()
  }
)
