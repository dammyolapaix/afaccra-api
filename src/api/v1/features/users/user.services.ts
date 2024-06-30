import { eq } from 'drizzle-orm'
import { db } from '../../db'
import users from './user.schema'
import { NewUserType } from './user.types'

export const getSingleUserById = async (id: string) =>
  await db.query.users.findFirst({
    where: eq(users.id, id),
    columns: { password: false },
    with: {
      roles: {
        with: {
          role: true,
        },
      },
    },
  })

export const getSingleUserByEmail = async (email: string) =>
  await db.query.users.findFirst({ where: eq(users.email, email) })

export const createUser = async (user: NewUserType) => {
  const newUser = await db.insert(users).values(user).returning()

  return newUser[0]
}

export const updateUserById = async (
  userId: string,
  userToBeUpdated: Partial<NewUserType>
) => {
  const updatedUser = await db
    .update(users)
    .set(userToBeUpdated)
    .where(eq(users.id, userId))
    .returning()

  return updatedUser[0]
}
