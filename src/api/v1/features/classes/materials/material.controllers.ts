import { NextFunction, Request, Response } from 'express'
import {
  MaterialType,
  NewMaterialType,
  SingleMaterialRequestType,
  createMaterial,
  deleteMaterialById,
  getMaterials,
  updateMaterialById,
} from '.'
import { asyncHandler } from '../../../middlewares'

export const getMaterialsHandler = asyncHandler(
  async (req: Request<{}, {}, {}, {}>, res: Response, next: NextFunction) => {
    const materials = await getMaterials()

    res.status(200).json({ success: true, count: materials.length, materials })
  }
)

export const createMaterialHandler = asyncHandler(
  async (
    req: Request<{}, {}, NewMaterialType, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const material = await createMaterial(req.body)

    res.status(200).json({ success: true, material })
  }
)

export const getSingleMaterialByIdHandler = asyncHandler(
  async (req: SingleMaterialRequestType, res: Response, next: NextFunction) =>
    res.status(200).json({ success: true, material: req.material! })
)

export const updateMaterialByIdHandler = asyncHandler(
  async (
    req: Request<{ materialId: MaterialType['id'] }, {}, NewMaterialType, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const updatedMaterial = await updateMaterialById(
      req.params.materialId,
      req.body
    )

    res.status(200).json({ success: true, material: updatedMaterial })
  }
)

export const deleteMaterialByIdHandler = asyncHandler(
  async (
    req: Request<{ identifier: string }, {}, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    await deleteMaterialById(req.params.identifier)

    res.status(200).json({ success: true })
  }
)
