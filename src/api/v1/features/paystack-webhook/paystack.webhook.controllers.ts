import crypto from 'crypto'
import { asyncHandler } from '../../middlewares'
import { NextFunction, Request, Response } from 'express'

const secret = process.env.PAYSTACK_SECRET_KEY!

type PaystackEventBodyType = {
  event: 'charge.success'
  data: {
    id: string
    status: 'success'
    reference: string
    amount: number
    paid_at: string
    channel: 'card'
  }
}

// @desc        Listen to Paystack webhook events
// @route       GET /api/v1/subscriptions/{subscriptionId}
// @access      Private Admin || Member
export const listenToPaystackEventsHandler = asyncHandler(
  async (req: Request<{}, {}, {}, {}>, res: Response, next: NextFunction) => {
    //validate event
    const hash = crypto
      .createHmac('sha256', secret)
      .update(JSON.stringify(req.body))
      .digest('hex')
    console.log(hash)

    if (hash == req.headers['x-paystack-signature']) {
      // Retrieve the request's body
      const paystackEventBody = req.body as PaystackEventBodyType

      switch (paystackEventBody.event) {
        case 'charge.success':
          break

        default:
          break
      }
      // Do something with event
    }

    res.send(200)
  }
)

// {
//   "event": "charge.success",
//   "data": {
//     "id": 302961,
//     "domain": "live",
//     "status": "success",
//     "reference": "qTPrJoy9Bx",
//     "amount": 10000,
//     "message": null,
//     "gateway_response": "Approved by Financial Institution",
//     "paid_at": "2016-09-30T21:10:19.000Z",
//     "created_at": "2016-09-30T21:09:56.000Z",
//     "channel": "card",
//     "currency": "NGN",
//     "ip_address": "41.242.49.37",
//     "metadata": 0,
//     "log": {
//       "time_spent": 16,
//       "attempts": 1,
//       "authentication": "pin",
//       "errors": 0,
//       "success": false,
//       "mobile": false,
//       "input": [],
//       "channel": null,
//       "history": [
//         {
//           "type": "input",
//           "message": "Filled these fields: card number, card expiry, card cvv",
//           "time": 15
//         },
//         {
//           "type": "action",
//           "message": "Attempted to pay",
//           "time": 15
//         },
//         {
//           "type": "auth",
//           "message": "Authentication Required: pin",
//           "time": 16
//         }
//       ]
//     },
//     "fees": null,
//     "customer": {
//       "id": 68324,
//       "first_name": "BoJack",
//       "last_name": "Horseman",
//       "email": "bojack@horseman.com",
//       "customer_code": "CUS_qo38as2hpsgk2r0",
//       "phone": null,
//       "metadata": null,
//       "risk_action": "default"
//     },
//     "authorization": {
//       "authorization_code": "AUTH_f5rnfq9p",
//       "bin": "539999",
//       "last4": "8877",
//       "exp_month": "08",
//       "exp_year": "2020",
//       "card_type": "mastercard DEBIT",
//       "bank": "Guaranty Trust Bank",
//       "country_code": "NG",
//       "brand": "mastercard",
//       "account_name": "BoJack Horseman"
//     },
//     "plan": {}
//   }
// }
