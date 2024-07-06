import cohorts from './cohort.schema'

export type CohortType = typeof cohorts.$inferSelect
export type NewCohortType = typeof cohorts.$inferInsert
