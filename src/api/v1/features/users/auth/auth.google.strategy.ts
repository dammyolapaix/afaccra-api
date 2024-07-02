import passportGoogle from 'passport-google-oauth20'
const GoogleStrategy = passportGoogle.Strategy
import { UserType, createUser, getSingleUserByEmail, updateUserById } from '../'

const googleCredentials = {
  clientID: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  callbackURL: process.env.GOOGLE_CLIENT_CALLBACK_URL!,
}

export const googleStrategy = new GoogleStrategy(
  googleCredentials,
  async (accessToken, refreshToken, profile, cb) => {
    try {
      const { id, emails, provider, name } = profile

      const existingUser = await getSingleUserByEmail(emails?.[0].value!)

      if (existingUser === undefined) {
        const user = await createUser({
          email: emails?.[0].value!,
          provider,
          providerId: id,
        })

        cb(null, user as UserType)
      }

      if (existingUser && existingUser.provider !== 'google') {
        const user = await updateUserById(existingUser.id, {
          provider: 'google',
          providerId: id,
        })

        cb(null, user as UserType)
      }

      cb(null, existingUser as UserType)
    } catch (error) {
      console.log(error)
      cb(error, undefined)
    }
  }
)
