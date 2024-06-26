import { NextFunction, Request, Response } from 'express'
import { asyncHandler } from '../../middlewares'
import crypto from 'crypto'
import { deleteS3ObjectByKey, getS3UploadPresignedURL } from '../../utils'
import { deleteAttachmentById } from '../classes/attachments'
import { DeleteS3ObjectType, S3UploadPresignedType } from '.'

export const getS3UploadPresignedURLHandler = asyncHandler(
  async (
    req: Request<{}, {}, S3UploadPresignedType, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const { resource, ContentType, fileName } = req.body

    const Key = `${resource}/${fileName}-${crypto
      .randomBytes(20)
      .toString('hex')}`

    const s3UploadPresignedURL = await getS3UploadPresignedURL({
      Key,
      ContentType,
    })

    res.status(200).json({ success: true, s3UploadPresignedURL, awsS3Key: Key })
  }
)

export const deleteS3ObjectByKeyHandler = asyncHandler(
  async (
    req: Request<{}, {}, DeleteS3ObjectType, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const { Key, resource, resourceId } = req.body

    const deleteS3Object = await deleteS3ObjectByKey({ Key })

    if (deleteS3Object) {
      switch (resource) {
        case 'attachments':
          await deleteAttachmentById(resourceId)
          break
      }
    }

    res.status(200).json({ success: true })
  }
)
