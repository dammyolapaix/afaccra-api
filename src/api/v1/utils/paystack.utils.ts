import { makePaystackRequest } from '../config'
import {
  InitializePaystackTransactionSuccessResType,
  InitializePaystackTransactionType,
  VerifyPaystackTransactionSuccessResType,
  VerifyPaystackTransactionType,
} from '../types'

export const initializePaystackTransaction = async (
  transaction: InitializePaystackTransactionType
) => {
  const { data } =
    await makePaystackRequest.post<InitializePaystackTransactionSuccessResType>(
      '/transaction/initialize',
      {
        ...transaction,
        currency: 'GHS',
        callback_url: `${process.env.FRONTEND_URL}/payment/success`,
      }
    )

  return data
}

export const verifyPaystackTransaction = async ({
  reference,
}: VerifyPaystackTransactionType) => {
  const { data } =
    await makePaystackRequest.get<VerifyPaystackTransactionSuccessResType>(
      `/transaction/verify/${reference}`
    )

  return data
}
