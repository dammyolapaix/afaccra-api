import {
  boolean,
  numeric,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core'

const books = pgTable('books', {
  id: uuid('id').primaryKey().defaultRandom().notNull(),
  title: varchar('title', { length: 256 }).unique(),
  price: numeric('price', {
    precision: 100,
    scale: 2,
  }).notNull(),
  isPublished: boolean('is_published').default(false).notNull(),
  createdAt: timestamp('created_at', { mode: 'string' }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'string' }).defaultNow(),
})

export default books
