import {
  createAttachmentMiddleware,
  singleAttachmentMiddleware,
} from './attachment.middlewares'
import { createAttachmentValidation } from './attachment.validations'
import {
  NewAttachmentType,
  SingleAttachmentRequestType,
  AttachmentType,
} from './attachment.types'
import {
  createAttachment,
  getSingleAttachmentById,
  getAttachments,
  updateAttachmentById,
  deleteAttachmentById,
} from './attachment.services'
import {
  createAttachmentHandler,
  getAttachmentsHandler,
  getSingleAttachmentByIdHandler,
  updateAttachmentByIdHandler,
  deleteAttachmentByIdHandler,
} from './attachment.controllers'
import attachmentRoutes from './attachment.routes'

export { createAttachmentMiddleware, singleAttachmentMiddleware }
export { createAttachmentValidation }
export { NewAttachmentType, SingleAttachmentRequestType, AttachmentType }
export {
  createAttachment,
  getSingleAttachmentById,
  getAttachments,
  updateAttachmentById,
  deleteAttachmentById,
}
export {
  createAttachmentHandler,
  getAttachmentsHandler,
  getSingleAttachmentByIdHandler,
  updateAttachmentByIdHandler,
  deleteAttachmentByIdHandler,
}
export { attachmentRoutes }
