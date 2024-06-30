import { relations } from 'drizzle-orm'
import { pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'
import usersToRoles from './user.role.schema'

const roles = pgTable('roles', {
  id: uuid('id').primaryKey().defaultRandom().notNull(),
  name: varchar('name', { length: 256 }).unique().notNull(),
  description: text('description'),
  createdAt: timestamp('created_at', { mode: 'string' }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'string' }).defaultNow(),
})

export const rolesRelations = relations(roles, ({ many }) => ({
  users: many(usersToRoles),
}))

export default roles
