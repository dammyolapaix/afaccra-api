import { UserType } from '../../features/users'

declare module 'express-serve-static-core' {
  export interface Request {
    user?: UserType
  }
}
