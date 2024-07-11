import { asyncHandler } from '../../middlewares'
import { getLevels } from '.'
import { NextFunction, Request, Response } from 'express'

export const getLevelsHandler = asyncHandler(
  async (req: Request<{}, {}, {}, {}>, res: Response, next: NextFunction) => {
    const levels = await getLevels()

    res.status(200).json({ success: true, count: levels.length, levels })
  }
)
