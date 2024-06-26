import {
  createOptionMiddleware,
  singleOptionMiddleware,
} from './option.middlewares'
import { createOptionValidation } from './option.validations'
import {
  NewOptionType,
  SingleOptionRequestType,
  OptionType,
} from './option.types'
import {
  createOption,
  getSingleOptionById,
  getOptions,
  updateOptionById,
  deleteOptionById,
} from './option.services'
import {
  createOptionHandler,
  getOptionsHandler,
  getSingleOptionByIdHandler,
  updateOptionByIdHandler,
  deleteOptionByIdHandler,
} from './option.controllers'
import optionRoutes from './option.routes'

export { createOptionMiddleware, singleOptionMiddleware }
export { createOptionValidation }
export { NewOptionType, SingleOptionRequestType, OptionType }
export {
  createOption,
  getSingleOptionById,
  getOptions,
  updateOptionById,
  deleteOptionById,
}
export {
  createOptionHandler,
  getOptionsHandler,
  getSingleOptionByIdHandler,
  updateOptionByIdHandler,
  deleteOptionByIdHandler,
}
export { optionRoutes }
