import { eq } from 'drizzle-orm'
import { db } from '../../../db'
import { CohortType } from '.'
import cohorts from './cohort.schema'

export const getSingleCohortById = async ({ id }: Pick<CohortType, 'id'>) =>
  await db.query.cohorts.findFirst({
    where: eq(cohorts.id, id),
  })
