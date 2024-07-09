import { Request } from 'express'
import cohorts from './cohort.schema'

export type CohortType = typeof cohorts.$inferSelect
export type NewCohortType = typeof cohorts.$inferInsert

export type SingleCohortRequestType = Request<
  { cohortId?: CohortType['id'] },
  {},
  { cohortId?: CohortType['id'] },
  {}
> & {
  cohort?: CohortType
}
