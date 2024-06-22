import { authenticatedMiddleware } from './authorization.middlewares'
import { authByEmailValidation } from '../user.validations'
import {
  loginUserByEmailMiddleware,
  registerUserByEmailMiddleware,
  setCookieMiddleware,
} from './auth.middlewares'
import { registerUserByEmailHandler } from './auth.controllers'
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
export { registerUserByEmailHandler }
export { authRoutes }
