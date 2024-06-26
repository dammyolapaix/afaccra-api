import { Request } from 'express'
import options from './option.schema'

export type OptionType = typeof options.$inferSelect
export type NewOptionType = typeof options.$inferInsert

export type SingleOptionRequestType = Request<
  { optionId: OptionType['id'] },
  {},
  {},
  {}
> & {
  option?: OptionType
}
