import {
  createMaterialMiddleware,
  singleMaterialMiddleware,
} from './material.middlewares'
import { createMaterialValidation } from './material.validations'
import {
  NewMaterialType,
  SingleMaterialRequestType,
  MaterialType,
} from './material.types'
import {
  createMaterial,
  getSingleMaterialById,
  getMaterials,
  updateMaterialById,
  deleteMaterialById,
} from './material.services'
import {
  createMaterialHandler,
  getMaterialsHandler,
  getSingleMaterialByIdHandler,
  updateMaterialByIdHandler,
  deleteMaterialByIdHandler,
} from './material.controllers'
import materialRoutes from './material.routes'

export { createMaterialMiddleware, singleMaterialMiddleware }
export { createMaterialValidation }
export { NewMaterialType, SingleMaterialRequestType, MaterialType }
export {
  createMaterial,
  getSingleMaterialById,
  getMaterials,
  updateMaterialById,
  deleteMaterialById,
}
export {
  createMaterialHandler,
  getMaterialsHandler,
  getSingleMaterialByIdHandler,
  updateMaterialByIdHandler,
  deleteMaterialByIdHandler,
}
export { materialRoutes }
