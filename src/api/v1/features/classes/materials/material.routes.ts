import express from 'express'
import {
  createMaterialHandler,
  createMaterialMiddleware,
  createMaterialValidation,
  deleteMaterialByIdHandler,
  getMaterialsHandler,
  getSingleMaterialByIdHandler,
  singleMaterialMiddleware,
  updateMaterialByIdHandler,
} from '.'
import { validationMiddleware } from '../../../middlewares'
import { singleClassMiddleware } from '../class.middlewares'

const router = express.Router({ mergeParams: true })

router
  .route('/')
  .get(getMaterialsHandler)
  .post(
    validationMiddleware(createMaterialValidation),
    singleClassMiddleware,
    createMaterialMiddleware,
    createMaterialHandler
  )

router
  .route('/:materialId')
  .get(singleMaterialMiddleware, getSingleMaterialByIdHandler)
  .patch(singleMaterialMiddleware, updateMaterialByIdHandler)
  .delete(singleMaterialMiddleware, deleteMaterialByIdHandler)

export default router
