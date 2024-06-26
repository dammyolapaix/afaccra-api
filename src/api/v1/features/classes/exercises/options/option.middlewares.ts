import { NextFunction, Request, Response } from 'express'
import { NewOptionType, getSingleOptionById, SingleOptionRequestType } from '.'
import { asyncHandler } from '../../../../middlewares'
import { ErrorResponse } from '../../../../utils'

export const createOptionMiddleware = asyncHandler(
  async (
    req: Request<{}, {}, NewOptionType, {}>,
    res: Response,
    next: NextFunction
  ) => {
    req.body.userId = req.user!.id

    next()
  }
)

export const singleOptionMiddleware = asyncHandler(
  async (req: SingleOptionRequestType, res: Response, next: NextFunction) => {
    const { optionId: id } = req.params

    const option = await getSingleOptionById({ id })

    if (option === undefined)
      return next(new ErrorResponse(req.t('error.class.option.not_found'), 404))

    req.option = option

    next()
  }
)
