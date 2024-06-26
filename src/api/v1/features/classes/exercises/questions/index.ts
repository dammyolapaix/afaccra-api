import {
  createQuestionMiddleware,
  singleQuestionMiddleware,
} from './question.middlewares'
import { createQuestionValidation } from './question.validations'
import {
  NewQuestionType,
  SingleQuestionRequestType,
  QuestionType,
} from './question.types'
import {
  createQuestion,
  getSingleQuestionById,
  getQuestions,
  updateQuestionById,
  deleteQuestionById,
} from './question.services'
import {
  createQuestionHandler,
  getQuestionsHandler,
  getSingleQuestionByIdHandler,
  updateQuestionByIdHandler,
  deleteQuestionByIdHandler,
} from './question.controllers'
import questionRoutes from './question.routes'

export { createQuestionMiddleware, singleQuestionMiddleware }
export { createQuestionValidation }
export { NewQuestionType, SingleQuestionRequestType, QuestionType }
export {
  createQuestion,
  getSingleQuestionById,
  getQuestions,
  updateQuestionById,
  deleteQuestionById,
}
export {
  createQuestionHandler,
  getQuestionsHandler,
  getSingleQuestionByIdHandler,
  updateQuestionByIdHandler,
  deleteQuestionByIdHandler,
}
export { questionRoutes }
