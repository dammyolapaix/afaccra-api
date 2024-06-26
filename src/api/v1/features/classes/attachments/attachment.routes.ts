import express from 'express'
import {
  createAttachmentHandler,
  createAttachmentMiddleware,
  createAttachmentValidation,
  deleteAttachmentByIdHandler,
  getAttachmentsHandler,
  getSingleAttachmentByIdHandler,
  singleAttachmentMiddleware,
  updateAttachmentByIdHandler,
} from '.'
import { validationMiddleware } from '../../../middlewares'
import { singleExerciseMiddleware } from '../exercises'
import { singleMaterialMiddleware } from '../materials'

const router = express.Router({ mergeParams: true })

router
  .route('/')
  .get(getAttachmentsHandler)
  .post(
    validationMiddleware(createAttachmentValidation),
    singleExerciseMiddleware,
    singleMaterialMiddleware,
    createAttachmentMiddleware,
    createAttachmentHandler
  )

router
  .route('/:attachmentId')
  .get(singleAttachmentMiddleware, getSingleAttachmentByIdHandler)
  .patch(
    singleAttachmentMiddleware,
    singleExerciseMiddleware,
    singleMaterialMiddleware,
    updateAttachmentByIdHandler
  )
  .delete(singleAttachmentMiddleware, deleteAttachmentByIdHandler)

export default router
