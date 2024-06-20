import { NextFunction, Request, Response } from 'express'
import { ErrorResponse } from '../utils'

export const errorHandler = (
  err: ErrorResponse,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode: number = res.statusCode === 200 ? 500 : res.statusCode
  let message = err.message ? err.message : 'Server Error'

  // @ts-ignore
  if (err.code === '22P02' && err.routine === 'string_to_uuid') {
    statusCode = 400
    message = req.t('error.resource_not_found')
    new ErrorResponse(message, statusCode)
  }

  res.status(err.statusCode || statusCode).json({
    success: false,
    errors: [
      {
        err: err.name,
        message,
        stack: process.env.NODE_ENV === 'production' ? '' : err.stack,
      },
    ],
  })
}

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(
    `${req.t('error.route_not_found')} - ${req.originalUrl}`
  )
  res.status(404)
  next(error)
}
