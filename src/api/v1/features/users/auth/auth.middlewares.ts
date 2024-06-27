import { NextFunction, Response } from 'express'
import { asyncHandler } from '../../../middlewares'
import { getSingleUserByEmail } from '..'
import { getHashedPassword, getSignedJwtToken, isPasswordMatched } from '.'
import { ErrorResponse } from '../../../utils'
import { AuthByEmailRequestType } from '../user.types'

export const loginUserByEmailMiddleware = asyncHandler(
  async (req: AuthByEmailRequestType, res: Response, next: NextFunction) => {
    let { email, password } = req.body

    email = req.body.email.toLowerCase().trim()

    // Check if user exists
    const user = await getSingleUserByEmail(email)

    if (user === undefined)
      return next(
        new ErrorResponse(req.t('error.auth.credentials_invalid'), 400)
      )

    // Check if password is correct, by comparing the entered password and the user password

    if (user.password === null)
      return next(
        new ErrorResponse(req.t('error.auth.credentials_invalid'), 400)
      )

    const passwordMatched = await isPasswordMatched({
      enteredPassword: password!,
      userPassword: user.password,
    })

    if (!passwordMatched)
      return next(
        new ErrorResponse(req.t('error.auth.credentials_invalid'), 400)
      )

    const token = getSignedJwtToken(user.id)

    req.token = token

    next()
  }
)

export const registerUserByEmailMiddleware = asyncHandler(
  async (req: AuthByEmailRequestType, res: Response, next: NextFunction) => {
    const { email, password } = req.body

    // Check if user exists
    const user = await getSingleUserByEmail(email)

    if (user)
      return next(new ErrorResponse(req.t('error.auth.user_exists'), 400))

    req.body.password = await getHashedPassword(password)
    req.body.email = req.body.email.toLowerCase().trim()
    req.body.provider = 'email'
    req.isRegister = true

    next()
  }
)

const { COOKIE_EXPIRES, NODE_ENV } = process.env

export const setCookieMiddleware = asyncHandler(
  async (req: AuthByEmailRequestType, res: Response, next: NextFunction) => {
    const token = req.token
    const status = req.isRegister ? 201 : 200

    res
      .status(status)
      .cookie('token', token, {
        expires: new Date(
          Date.now() + Number(COOKIE_EXPIRES) * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        secure: NODE_ENV === 'production',
        sameSite: NODE_ENV === 'production' ? 'none' : undefined,
      })
      .json({
        success: true,
        token,
      })
  }
)
