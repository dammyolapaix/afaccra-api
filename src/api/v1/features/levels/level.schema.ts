import { pgEnum, pgTable, timestamp, uuid } from 'drizzle-orm/pg-core'
import coursePrices from '../courses/prices/price.schema'
import { relations } from 'drizzle-orm'

export const levelEnum = pgEnum('level', ['A1/A2', 'B1/B2', 'C1/C2'])

const levels = pgTable('levels', {
  id: uuid('id').primaryKey().defaultRandom().notNull(),
  name: levelEnum('name').unique(),
  createdAt: timestamp('created_at', { mode: 'string' }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'string' }).defaultNow(),
})

export const levelsRelations = relations(levels, ({ many }) => ({
  prices: many(coursePrices),
}))

export default levels
