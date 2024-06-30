import { relations } from 'drizzle-orm'
import { pgEnum, pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'
import coursePurchases from '../courses/purchases/purchase.schema'
import usersToRoles from './roles/user.role.schema'

export const userAuthProviderEnum = pgEnum('user_auth_provider', [
  'email',
  'google',
  'facebook',
])

const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom().notNull(),
  email: varchar('email', { length: 256 }).notNull().unique(),
  password: varchar('password', { length: 256 }),
  provider: userAuthProviderEnum('provider').notNull(),
  providerId: varchar('providerId', { length: 256 }),
  createdAt: timestamp('created_at', { mode: 'string' }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'string' }).defaultNow(),
})

export const usersRelations = relations(users, ({ many }) => ({
  coursePurchases: many(coursePurchases),
  roles: many(usersToRoles),
}))

export default users
