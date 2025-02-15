import { boolean, pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'
import users from '../users/user.schema'
import { relations } from 'drizzle-orm'
import coursePrices from '../courses/prices/price.schema'

const classes = pgTable('classes', {
  id: uuid('id').primaryKey().defaultRandom().notNull(),
  name: varchar('name', { length: 256 }).notNull(),
  displayOnWebsite: boolean('displayOnWebsite').notNull().default(false),
  priceId: uuid('price_id')
    .references(() => coursePrices.id)
    .notNull(),
  userId: uuid('user_id')
    .references(() => users.id)
    .notNull(),
  createdAt: timestamp('created_at', { mode: 'string' }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'string' }).defaultNow(),
})

export const classesRelations = relations(classes, ({ one }) => ({
  user: one(users, {
    fields: [classes.userId],
    references: [users.id],
  }),
  price: one(coursePrices, {
    fields: [classes.priceId],
    references: [coursePrices.id],
  }),
}))

export default classes
