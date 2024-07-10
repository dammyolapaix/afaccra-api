export type InitializePaystackTransactionType = {
  email: string
  amount: string
  reference: string
}

export type VerifyPaystackTransactionType = {
  reference: string
}

export type InitializePaystackTransactionSuccessResType = {
  status: boolean
  message: 'Authorization URL created'
  data: {
    authorization_url: string
    access_code: string
    reference: string
  }
}

export type VerifyPaystackTransactionSuccessResType = {
  status: boolean
  message: 'Verification successful'
  data: {
    id: number
    status: 'success' | 'abandoned'
    amount: number
    paid_at: string | null
  }
}
