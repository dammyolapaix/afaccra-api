import { Request } from 'express'
import materials from './material.schema'

export type MaterialType = typeof materials.$inferSelect
export type NewMaterialType = typeof materials.$inferInsert

export type SingleMaterialRequestType = Request<
  { materialId?: MaterialType['id'] },
  {},
  { materialId?: MaterialType['id'] },
  {}
> & {
  material?: MaterialType
}
