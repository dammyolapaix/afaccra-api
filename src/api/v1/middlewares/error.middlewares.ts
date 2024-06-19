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

  if (err.name === 'CastError') {
    statusCode = 404
    message = `Resource not found`
    new ErrorResponse(message, statusCode)
  }

  if (err.name === 'ValidationError') {
    statusCode = 400
    new ErrorResponse(message, statusCode)
  }

  // @ts-ignore
  if (err.code === '22P02' && err.routine === 'string_to_uuid') {
    statusCode = 400
    message = `Can't find the resource you are looking for`
    new ErrorResponse(message, statusCode)
  }

  res.status(err.statusCode || statusCode).json({
    success: false,
    error: {
      err: err.name,
      message,
      stack: process.env.NODE_ENV === 'production' ? '' : err.stack,
    },
  })
}

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Route not found - ${req.originalUrl}`)
  res.status(404)
  next(error)
}
