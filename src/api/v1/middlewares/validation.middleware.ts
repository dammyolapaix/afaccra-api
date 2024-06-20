import { NextFunction, Request, Response } from 'express'
import { z, AnyZodObject } from 'zod'
import { convertQueryStringToObject } from '../utils'

const validationMiddleware =
  (schema: AnyZodObject) =>
  async (req: Request<{}, {}, {}, {}>, res: Response, next: NextFunction) => {
    req.query = convertQueryStringToObject(req.query)

    try {
      schema.parse({
        params: req.params,
        body: req.body,
        query: req.query,
      })
      next()
    } catch (error) {
      let localizedErrors: {}[] = []

      if (error instanceof z.ZodError) {
        localizedErrors = error.errors.map((err) => {
          // Localize error message using i18next instance
          return {
            message: req.t(err.message),
          }
        })
      }

      res.status(400).json({
        success: false,
        errors: localizedErrors,
      })
    }
  }

export default validationMiddleware
