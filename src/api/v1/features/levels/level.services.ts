import { db } from '../../db'

export const getLevels = async () => await db.query.levels.findMany()
