import { integer, pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import users from '../../users/user.schema'
import classMaterials from '../materials/material.schema'
import classExercises from '../exercises/exercise.schema'

const classAttachments = pgTable('class_attachments', {
  id: uuid('id').primaryKey().defaultRandom().notNull(),
  link: varchar('link', { length: 256 }),
  ytLink: varchar('yt_link', { length: 256 }),
  awsS3Key: varchar('aws_s3_key', { length: 256 }),
  awsS3PresignedUrl: varchar('aws_s3_presigned_url', { length: 256 }),
  awsS3PresignedUrlExpiresAt: timestamp('aws_s3_presigned_url_expires_at', {
    mode: 'string',
  }),
  size: integer('size'),
  contentType: varchar('content_type', { length: 256 }),
  userId: uuid('user_id')
    .references(() => users.id)
    .notNull(),
  materialId: uuid('material_id').references(() => classMaterials.id),
  exerciseId: uuid('exercise_id').references(() => classExercises.id),
  createdAt: timestamp('created_at', { mode: 'string' }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'string' }).defaultNow(),
})

export const classAttachmentsRelations = relations(
  classAttachments,
  ({ one }) => ({
    user: one(users, {
      fields: [classAttachments.userId],
      references: [users.id],
    }),
    material: one(classMaterials, {
      fields: [classAttachments.materialId],
      references: [classMaterials.id],
    }),
    exercise: one(classExercises, {
      fields: [classAttachments.exerciseId],
      references: [classExercises.id],
    }),
  })
)

export default classAttachments
