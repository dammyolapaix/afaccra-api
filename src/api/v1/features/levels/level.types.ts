import levels from './level.schema'

export type LevelType = typeof levels.$inferSelect
export type NewLevelType = typeof levels.$inferInsert
