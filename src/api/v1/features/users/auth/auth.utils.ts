import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { UserType } from '..'
import { RolesType } from '../roles'

export const getSignedJwtToken = (userId: string) =>
  jwt.sign({ userId }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  })

export const getVerifiedJwtTokenUserId = ({
  token,
}: {
  token: string
}): string => {
  const jwtPayload = jwt.verify(token, process.env.JWT_SECRET!)

  // @ts-ignore
  return jwtPayload.userId
}

export const isPasswordMatched = ({
  enteredPassword,
  userPassword,
}: {
  enteredPassword: string
  userPassword: string
}): Promise<boolean> => bcrypt.compare(enteredPassword, userPassword)

export const isPasswordStrong = (password: string): boolean => {
  // Define your complexity criteria
  const hasUpperCase = /[A-Z]/.test(password) // Check for at least one uppercase letter
  const hasLowerCase = /[a-z]/.test(password) // Check for at least one lowercase letter
  const hasNumbers = /\d/.test(password) // Check for at least one digit
  const hasSpecialChars = /[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]/.test(password) // Check for at least one special character
  const has8CharactersOrMore = password.length >= 8 // Check for at least 8 characters

  //   Check if all complexity criteria are met
  return (
    hasUpperCase &&
    hasLowerCase &&
    hasNumbers &&
    hasSpecialChars &&
    has8CharactersOrMore
  )
}

export const getHashedPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10)
  return await bcrypt.hash(password, salt)
}

export const userHasRole = ({
  user,
  rolesToCheck,
}: {
  user: UserType
  rolesToCheck: RolesType[]
}): boolean => {
  const userRoles = user.roles.map((role) => role.role.name)
  return rolesToCheck.some((role) => userRoles.includes(role))
}
