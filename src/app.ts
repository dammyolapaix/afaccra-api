import express, { Application } from 'express'
import dotenv from 'dotenv'
dotenv.config()
import routes from './api/v1/routes'
import { errorHandler, notFound } from './api/v1/middlewares'
import i18next from 'i18next'
import i18nextMiddleware from 'i18next-http-middleware'
import session from 'express-session'
import { passportConfig } from './api/v1/config'

const app: Application = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
  session({
    secret: process.env.COOKIE_KEY!,
    resave: false,
    saveUninitialized: false,
  })
)
app.use(passportConfig.initialize())
app.use(passportConfig.session())

// Middleware initialization to handle language detection
app.use(
  i18nextMiddleware.handle(i18next, {
    removeLngFromUrl: false, // Optional: Remove language code from URL
  })
)

app.use(routes)
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT

app.listen(PORT, () => console.log(`App started on port ${PORT}`))
