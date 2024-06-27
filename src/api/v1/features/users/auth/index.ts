import { authenticatedMiddleware } from './authorization.middlewares'
import { authByEmailValidation } from '../user.validations'
import { googleStrategy } from './auth.google.strategy'
import {
  loginUserByEmailMiddleware,
  registerUserByEmailMiddleware,
  setCookieMiddleware,
} from './auth.middlewares'
import {
  oAuthRedirectHandler,
  registerUserByEmailHandler,
} from './auth.controllers'
import {
  isPasswordMatched,
  getVerifiedJwtTokenUserId,
  getSignedJwtToken,
  isPasswordStrong,
  getHashedPassword,
} from './auth.utils'
import authRoutes from './auth.routes'

export { authenticatedMiddleware }
export { authByEmailValidation }
export { googleStrategy }
export {
  loginUserByEmailMiddleware,
  registerUserByEmailMiddleware,
  setCookieMiddleware,
}
export {
  getVerifiedJwtTokenUserId,
  isPasswordMatched,
  getSignedJwtToken,
  isPasswordStrong,
  getHashedPassword,
}
export { oAuthRedirectHandler, registerUserByEmailHandler }
export { authRoutes }
