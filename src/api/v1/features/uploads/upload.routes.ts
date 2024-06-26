import express from 'express'
import {
  deleteS3ObjectByKeyHandler,
  deleteS3ObjectValidation,
  getS3UploadPresignedURLHandler,
  s3UploadPresignedValidation,
} from '.'
import { validationMiddleware } from '../../middlewares'

const router = express.Router()

router
  .route('/presigned-url')
  .post(
    validationMiddleware(s3UploadPresignedValidation),
    getS3UploadPresignedURLHandler
  )

router
  .route('/delete')
  .post(
    validationMiddleware(deleteS3ObjectValidation),
    deleteS3ObjectByKeyHandler
  )

export default router
