import express from 'express'
import passport from 'passport'
import validationMiddleware from '../../../middlewares/validation.middleware'
import {
  authByEmailValidation,
  loginUserByEmailMiddleware,
  oAuthRedirectHandler,
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

router.route('/google').get(
  passport.authenticate('google', {
    scope: ['email', 'profile'],
  })
)

router
  .route('/google/redirect')
  .get(passport.authenticate('google'), oAuthRedirectHandler)

export default router
