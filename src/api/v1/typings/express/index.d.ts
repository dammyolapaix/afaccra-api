import { UserType } from '../../features/users'

// declare global {
//   namespace Express {
//     interface Request {
//       user?: UserType
//     }
//   }
// }

declare global {
  namespace Express {
    interface User extends UserType {}
  }
}
