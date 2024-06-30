import roles from './role.schema'
import usersToRoles from './user.role.schema'

export type RoleType = typeof roles.$inferSelect
export type UserRolesType = typeof usersToRoles.$inferSelect & {
  role: RoleType
}
export type RolesType = 'admin' | 'staff' | 'instructor' | 'student'
