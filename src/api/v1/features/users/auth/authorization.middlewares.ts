import { NextFunction, Request, Response } from 'express'
import { asyncHandler } from '../../../middlewares'
import { ErrorResponse } from '../../../utils'
import { getVerifiedJwtTokenUserId } from '.'
import { getSingleUserById } from '..'

export const authenticatedMiddleware = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let token: string | undefined

    if (req.cookies && req.cookies.token) {
      token = req.cookies.token
    } else {
      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
      )
        token = req.headers.authorization.split(' ')[1]
    }

    // Make sure token exist
    if (!token || token === null || token === '' || token === 'null')
      return next(
        new ErrorResponse(req.t('error.auth.authentication_required'), 401)
      )

    // Verify user by jwt
    const userId = getVerifiedJwtTokenUserId({ token })

    const user = await getSingleUserById(userId)

    // Checking if the user exist
    if (user === undefined)
      return next(
        new ErrorResponse(req.t('error.auth.authentication_required'), 401)
      )

    req.user = user

    next()
  }
)
