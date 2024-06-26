import { NextFunction, Request, Response } from 'express'
import {
  NewAttachmentType,
  getSingleAttachmentById,
  SingleAttachmentRequestType,
} from '.'
import { asyncHandler } from '../../../middlewares'
import { ErrorResponse } from '../../../utils'

export const createAttachmentMiddleware = asyncHandler(
  async (
    req: Request<{}, {}, NewAttachmentType, {}>,
    res: Response,
    next: NextFunction
  ) => {
    req.body.userId = req.user!.id

    next()
  }
)

export const singleAttachmentMiddleware = asyncHandler(
  async (
    req: SingleAttachmentRequestType,
    res: Response,
    next: NextFunction
  ) => {
    const { attachmentId: id } = req.params

    const attachment = await getSingleAttachmentById({ id })

    if (attachment === undefined)
      return next(
        new ErrorResponse(req.t('error.class.attachment.not_found'), 404)
      )

    req.attachment = attachment

    next()
  }
)
