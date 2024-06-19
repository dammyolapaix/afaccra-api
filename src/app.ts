import express, { Application } from 'express'
import dotenv from 'dotenv'
dotenv.config()
import routes from './api/v1/routes'
import { errorHandler, notFound } from './api/v1/middlewares'

const app: Application = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(routes)
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT

app.listen(PORT, () => console.log(`App started on port ${PORT}`))
