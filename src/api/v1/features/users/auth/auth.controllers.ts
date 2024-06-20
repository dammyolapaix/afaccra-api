import { NextFunction, Response } from 'express'
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
