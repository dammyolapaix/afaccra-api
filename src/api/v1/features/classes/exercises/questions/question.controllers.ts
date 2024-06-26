import { NextFunction, Request, Response } from 'express'
import {
  QuestionType,
  NewQuestionType,
  SingleQuestionRequestType,
  createQuestion,
  deleteQuestionById,
  getQuestions,
  updateQuestionById,
} from '.'
import { asyncHandler } from '../../../../middlewares'

export const getQuestionsHandler = asyncHandler(
  async (req: Request<{}, {}, {}, {}>, res: Response, next: NextFunction) => {
    const questions = await getQuestions()

    res.status(200).json({ success: true, count: questions.length, questions })
  }
)

export const createQuestionHandler = asyncHandler(
  async (
    req: Request<{}, {}, NewQuestionType, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const question = await createQuestion(req.body)

    res.status(200).json({ success: true, question })
  }
)

export const getSingleQuestionByIdHandler = asyncHandler(
  async (req: SingleQuestionRequestType, res: Response, next: NextFunction) =>
    res.status(200).json({ success: true, question: req.question! })
)

export const updateQuestionByIdHandler = asyncHandler(
  async (
    req: Request<{ questionId: QuestionType['id'] }, {}, NewQuestionType, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const question = await updateQuestionById(req.params.questionId, req.body)

    res.status(200).json({ success: true, question })
  }
)

export const deleteQuestionByIdHandler = asyncHandler(
  async (
    req: Request<{ identifier: string }, {}, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    await deleteQuestionById(req.params.identifier)

    res.status(200).json({ success: true })
  }
)
