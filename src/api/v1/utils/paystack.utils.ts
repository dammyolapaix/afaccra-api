import { makePaystackRequest } from '../config'

type InitializePaystackTransactionType = {
  email: string
  amount: string
  reference: string
}

type VerifyPaystackTransactionType = {
  reference: string
}

type InitializePaystackTransactionSuccessResType = {
  status: boolean
  message: 'Authorization URL created'
  data: {
    authorization_url: string
    access_code: string
    reference: string
  }
}

type VerifyPaystackTransactionSuccessResType = {
  status: boolean
  message: 'Verification successful'
  data: {
    id: number
    status: 'success' | 'abandoned'
    amount: number
    paid_at: string | null
  }
}

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
