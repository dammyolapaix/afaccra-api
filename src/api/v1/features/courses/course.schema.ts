import { pgTable, timestamp, uuid } from 'drizzle-orm/pg-core'

const courses = pgTable('courses', {
  id: uuid('id').primaryKey().defaultRandom().notNull(),
  createdAt: timestamp('created_at', { mode: 'string' }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'string' }).defaultNow(),
})

export default courses
