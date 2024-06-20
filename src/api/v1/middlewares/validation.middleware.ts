import { NextFunction, Request, Response } from 'express'
import { AnyZodObject, ZodError } from 'zod'
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
      res.status(400).json({
        success: false,
        error: {
          message: (error as ZodError).issues[0].message,
        },
      })
    }
  }

export default validationMiddleware
