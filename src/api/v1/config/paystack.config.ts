import axios from 'axios'

const { PAYSTACK_BASE_URL: baseURL, PAYSTACK_SECRET_KEY } = process.env

const makePaystackRequest = axios.create({
  baseURL,
  headers: {
    'Content-type': 'application/json',
    Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
  },
})

export default makePaystackRequest
