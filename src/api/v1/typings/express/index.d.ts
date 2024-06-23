import { UserType } from '../../features/users'

declare global {
  namespace Express {
    interface Request {
      user?: UserType
    }
  }
}
