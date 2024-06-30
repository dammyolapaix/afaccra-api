import {
  authenticatedMiddleware,
  adminOnlyRouteMiddleware,
  instructorOnlyOrAboveRouteMiddleware,
  staffOnlyOrAboveRouteMiddleware,
  studentOnlyOrAboveRouteMiddleware,
} from './authorization.middlewares'
import { authByEmailValidation } from '../user.validations'
import { googleStrategy } from './auth.google.strategy'
import {
  loginUserByEmailMiddleware,
  registerUserByEmailMiddleware,
  setCookieMiddleware,
} from './auth.middlewares'
import {
  getAuthUserEmailHandler,
  oAuthRedirectHandler,
  registerUserByEmailHandler,
} from './auth.controllers'
import {
  isPasswordMatched,
  getVerifiedJwtTokenUserId,
  getSignedJwtToken,
  isPasswordStrong,
  getHashedPassword,
  userHasRole,
} from './auth.utils'
import authRoutes from './auth.routes'

export {
  authenticatedMiddleware,
  adminOnlyRouteMiddleware,
  instructorOnlyOrAboveRouteMiddleware,
  staffOnlyOrAboveRouteMiddleware,
  studentOnlyOrAboveRouteMiddleware,
}
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
  userHasRole,
}
export {
  getAuthUserEmailHandler,
  oAuthRedirectHandler,
  registerUserByEmailHandler,
}
export { authRoutes }
