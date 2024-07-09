import { eq } from 'drizzle-orm'
import { db } from '../../../db'
import { CohortType, NewCohortType } from '.'
import cohorts from './cohort.schema'

export const createCohort = async (cohort: NewCohortType) => {
  const newCohort = await db.insert(cohorts).values(cohort).returning()
  return newCohort[0]
}

export const getSingleCohortById = async ({ id }: Pick<CohortType, 'id'>) =>
  await db.query.cohorts.findFirst({
    where: eq(cohorts.id, id),
  })
