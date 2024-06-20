import { eq } from 'drizzle-orm'
import { db } from '../../db'
import users from './user.schema'
import { NewUserType } from './user.types'

export const getSingleUserById = async (id: string) =>
  await db.query.users.findFirst({ where: eq(users.id, id) })

export const getSingleUserByEmail = async (email: string) =>
  await db.query.users.findFirst({ where: eq(users.email, email) })

export const createUser = async (user: NewUserType) => {
  const newUser = await db
    .insert(users)
    .values(user)
    .returning({ id: users.id })

  return newUser[0]
}
