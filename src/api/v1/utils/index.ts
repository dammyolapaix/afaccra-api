import { ErrorResponse } from './error.utils'
import {
  initializePaystackTransaction,
  verifyPaystackTransaction,
} from './paystack.utils'
import { convertQueryStringToObject } from './queryStringToObject.utils'
import {
  deleteS3ObjectByKey,
  getS3PresignedURL,
  getS3UploadPresignedURL,
} from './s3.utils'

export {
  ErrorResponse,
  initializePaystackTransaction,
  verifyPaystackTransaction,
  convertQueryStringToObject,
  deleteS3ObjectByKey,
  getS3PresignedURL,
  getS3UploadPresignedURL,
}

export const checkRequiredFields = <T extends object>(
  obj: T,
  fieldsToCheck: (keyof T)[]
): boolean => {
  for (const field of fieldsToCheck) {
    if (field in obj) {
      const value = obj[field]
      if (value === null || (Array.isArray(value) && value.length === 0)) {
        return false
      }
    } else {
      return false // If field is not found in obj
    }
  }
  return true
}
