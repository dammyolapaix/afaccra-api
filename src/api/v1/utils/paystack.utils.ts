import { makePaystackRequest } from '../config'

type InitializePaystackTransactionType = {
  email: string
  amount: string
}

type InitializePaystackTransactionSuccessResType = {
  status: true
  message: 'Authorization URL created'
  data: {
    authorization_url: string
    access_code: string
    reference: string
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
