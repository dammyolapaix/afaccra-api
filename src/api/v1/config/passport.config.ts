import passport from 'passport'
import { googleStrategy } from '../features/users/auth'
import { UserType, getSingleUserById } from '../features/users'

passport.use(googleStrategy)

passport.serializeUser((user: UserType, cb) => cb(null, user.id))

passport.deserializeUser(async (userId: UserType['id'], cb) => {
  const user = await getSingleUserById(userId)
  cb(null, user)
})

export default passport
