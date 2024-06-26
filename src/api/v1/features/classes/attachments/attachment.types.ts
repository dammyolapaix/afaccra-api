import { Request } from 'express'
import attachments from './attachment.schema'

export type AttachmentType = typeof attachments.$inferSelect
export type NewAttachmentType = typeof attachments.$inferInsert

export type SingleAttachmentRequestType = Request<
  { attachmentId: AttachmentType['id'] },
  {},
  {},
  {}
> & {
  attachment?: AttachmentType
}
