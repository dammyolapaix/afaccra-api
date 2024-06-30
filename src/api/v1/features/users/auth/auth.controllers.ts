import { NextFunction, Request, Response } from 'express'
import { asyncHandler } from '../../../middlewares'
import { AuthByEmailRequestType, createUser } from '..'
import { getSignedJwtToken } from '.'

// @desc        Register User
// @route       POST /api/v1/auth/register
// @access      Public
export const registerUserByEmailHandler = asyncHandler(
  async (req: AuthByEmailRequestType, res: Response, next: NextFunction) => {
    const user = await createUser(req.body)
    req.token = getSignedJwtToken(user.id)

    next()
  }
)

const { FRONTEND_URL, COOKIE_EXPIRES, NODE_ENV } = process.env

// @desc        oAuth Redirect
// @route       POST /api/v1/auth/{provider}/redirect
// @access      Public
export const oAuthRedirectHandler = asyncHandler(
  async (req: AuthByEmailRequestType, res: Response, next: NextFunction) => {
    if (!req.user) res.redirect(`${FRONTEND_URL!}/auth/sso?status=failed`)

    const token = getSignedJwtToken(req.user!.id)

    res
      .status(200)
      .cookie('token', token, {
        expires: new Date(
          Date.now() + Number(COOKIE_EXPIRES) * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        secure: NODE_ENV === 'production',
        sameSite: NODE_ENV === 'production' ? 'none' : undefined,
      })
      .redirect(`${FRONTEND_URL!}/auth/sso?status=success`)
  }
)

// @desc        Get Auth user
// @route       GET /api/v1/auth/user
// @access      Private
export const getAuthUserEmailHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) =>
    res.status(200).json({ user: req.user! })
)
