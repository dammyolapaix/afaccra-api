import express from 'express'
import { validationMiddleware } from '../../../middlewares'
import {
  authByEmailValidation,
  loginUserByEmailMiddleware,
  registerUserByEmailHandler,
  registerUserByEmailMiddleware,
  setCookieMiddleware,
} from '.'

const router = express.Router()

router
  .route('/register')
  .post(
    validationMiddleware(authByEmailValidation),
    registerUserByEmailMiddleware,
    registerUserByEmailHandler,
    setCookieMiddleware
  )

router
  .route('/login')
  .post(
    validationMiddleware(authByEmailValidation),
    loginUserByEmailMiddleware,
    setCookieMiddleware
  )

export default router
