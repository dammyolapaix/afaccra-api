import { AttachmentType, NewAttachmentType } from '.'
import { db } from '../../../db'
import classAttachments from './attachment.schema'
import { eq } from 'drizzle-orm'

export const getAttachments = async () =>
  await db.query.classAttachments.findMany({
    with: {
      material: true,
      exercise: true,
      user: { columns: { password: false } },
    },
  })

export const createAttachment = async (attachment: NewAttachmentType) => {
  const newAttachment = await db
    .insert(classAttachments)
    .values(attachment)
    .returning()
  return newAttachment[0]
}

export const getSingleAttachmentById = async ({
  id,
}: Pick<AttachmentType, 'id'>) =>
  await db.query.classAttachments.findFirst({
    where: eq(classAttachments.id, id),
    with: {
      material: true,
      exercise: true,
      user: { columns: { password: false } },
    },
  })

export const updateAttachmentById = async (
  attachmentId: string,
  attachmentToBeUpdated: Partial<AttachmentType>
) => {
  const updatedAttachment = await db
    .update(classAttachments)
    .set(attachmentToBeUpdated)
    .where(eq(classAttachments.id, attachmentId))
    .returning()

  return updatedAttachment[0]
}

export const deleteAttachmentById = async (attachmentId: string) =>
  await db.delete(classAttachments).where(eq(classAttachments.id, attachmentId))
