import { pgTable, primaryKey, uuid } from 'drizzle-orm/pg-core'
import roles from './role.schema'
import users from '../user.schema'
import { relations } from 'drizzle-orm'

const usersToRoles = pgTable(
  'users_to_roles',
  {
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id),
    roleId: uuid('role_id')
      .notNull()
      .references(() => roles.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.userId, t.roleId] }),
  })
)

export const usersToRolesRelations = relations(usersToRoles, ({ one }) => ({
  role: one(roles, {
    fields: [usersToRoles.roleId],
    references: [roles.id],
  }),
  user: one(users, {
    fields: [usersToRoles.userId],
    references: [users.id],
  }),
}))

export default usersToRoles
