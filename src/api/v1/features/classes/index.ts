import {
  createClassMiddleware,
  singleClassMiddleware,
} from './class.middlewares'
import { createClassValidation } from './class.validations'
import { ClassType, NewClassType, SingleClassRequestType } from './class.types'
import {
  createClass,
  getClasses,
  getSingleClassById,
  updateClassById,
} from './class.services'
import {
  createClassHandler,
  getClassesHandler,
  getSingleClassByIdHandler,
  updateClassByIdHandler,
} from './class.controllers'
import classRoutes from './class.routes'

export { createClassMiddleware, singleClassMiddleware }
export { createClassValidation }
export { ClassType, NewClassType, SingleClassRequestType }
export { createClass, getClasses, getSingleClassById, updateClassById }
export {
  createClassHandler,
  getClassesHandler,
  getSingleClassByIdHandler,
  updateClassByIdHandler,
}
export { classRoutes }
