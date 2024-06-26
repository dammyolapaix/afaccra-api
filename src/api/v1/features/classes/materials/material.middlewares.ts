import { NextFunction, Request, Response } from 'express'
import {
  NewMaterialType,
  getSingleMaterialById,
  SingleMaterialRequestType,
} from '.'
import { asyncHandler } from '../../../middlewares'
import { ErrorResponse } from '../../../utils'
import { getSingleTopicById } from '../topics'

export const createMaterialMiddleware = asyncHandler(
  async (
    req: Request<{}, {}, NewMaterialType, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const { topicId } = req.body

    if (topicId) {
      const topic = await getSingleTopicById({ id: topicId })

      if (topic === undefined)
        return next(
          new ErrorResponse(req.t('error.class.topic.not_found'), 404)
        )
    }

    req.body.userId = req.user!.id

    next()
  }
)

export const singleMaterialMiddleware = asyncHandler(
  async (req: SingleMaterialRequestType, res: Response, next: NextFunction) => {
    if (req.params.materialId) {
      const material = await getSingleMaterialById({
        id: req.params.materialId,
      })

      if (material === undefined)
        return next(
          new ErrorResponse(req.t('error.class.material.not_found'), 404)
        )

      req.material = material
    }

    if (req.body.materialId) {
      const material = await getSingleMaterialById({ id: req.body.materialId })

      if (material === undefined)
        return next(
          new ErrorResponse(req.t('error.class.material.not_found'), 404)
        )

      req.material = material
    }

    next()
  }
)
