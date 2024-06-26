import { NextFunction, Request, Response } from 'express'
import {
  OptionType,
  NewOptionType,
  SingleOptionRequestType,
  createOption,
  deleteOptionById,
  getOptions,
  updateOptionById,
} from '.'
import { asyncHandler } from '../../../../middlewares'

export const getOptionsHandler = asyncHandler(
  async (req: Request<{}, {}, {}, {}>, res: Response, next: NextFunction) => {
    const options = await getOptions()

    res.status(200).json({ success: true, count: options.length, options })
  }
)

export const createOptionHandler = asyncHandler(
  async (
    req: Request<{}, {}, NewOptionType, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const option = await createOption(req.body)

    res.status(200).json({ success: true, option })
  }
)

export const getSingleOptionByIdHandler = asyncHandler(
  async (req: SingleOptionRequestType, res: Response, next: NextFunction) =>
    res.status(200).json({ success: true, option: req.option! })
)

export const updateOptionByIdHandler = asyncHandler(
  async (
    req: Request<{ optionId: OptionType['id'] }, {}, NewOptionType, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const option = await updateOptionById(req.params.optionId, req.body)

    res.status(200).json({ success: true, option })
  }
)

export const deleteOptionByIdHandler = asyncHandler(
  async (
    req: Request<{ identifier: string }, {}, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    await deleteOptionById(req.params.identifier)

    res.status(200).json({ success: true })
  }
)
