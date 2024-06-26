import { NextFunction, Request, Response } from 'express'
import {
  AttachmentType,
  NewAttachmentType,
  SingleAttachmentRequestType,
  createAttachment,
  deleteAttachmentById,
  getAttachments,
  updateAttachmentById,
} from '.'
import { asyncHandler } from '../../../middlewares'

export const getAttachmentsHandler = asyncHandler(
  async (req: Request<{}, {}, {}, {}>, res: Response, next: NextFunction) => {
    const attachments = await getAttachments()

    res
      .status(200)
      .json({ success: true, count: attachments.length, attachments })
  }
)

export const createAttachmentHandler = asyncHandler(
  async (
    req: Request<{}, {}, NewAttachmentType, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const attachment = await createAttachment(req.body)

    res.status(200).json({ success: true, attachment })
  }
)

export const getSingleAttachmentByIdHandler = asyncHandler(
  async (req: SingleAttachmentRequestType, res: Response, next: NextFunction) =>
    res.status(200).json({ success: true, attachment: req.attachment! })
)

export const updateAttachmentByIdHandler = asyncHandler(
  async (
    req: Request<
      { attachmentId: AttachmentType['id'] },
      {},
      NewAttachmentType,
      {}
    >,
    res: Response,
    next: NextFunction
  ) => {
    const attachment = await updateAttachmentById(
      req.params.attachmentId,
      req.body
    )

    res.status(200).json({ success: true, attachment })
  }
)

export const deleteAttachmentByIdHandler = asyncHandler(
  async (
    req: Request<{ identifier: string }, {}, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    await deleteAttachmentById(req.params.identifier)

    res.status(200).json({ success: true })
  }
)
