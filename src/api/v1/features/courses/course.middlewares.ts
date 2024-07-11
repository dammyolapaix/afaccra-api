import { NextFunction, Request, Response } from 'express'
import { asyncHandler } from '../../middlewares'
import {
  CourseType,
  CourseWithRelationshipsType,
  NewCourseType,
  SingleCourseByQueryRequestType,
  getSingleCourseByQuery,
} from '.'
import { ErrorResponse, checkRequiredFields } from '../../utils'
import slugify from 'slugify'

export const courseMiddleware = asyncHandler(
  async (
    req: Request<{}, {}, NewCourseType, {}> & {
      course?: CourseWithRelationshipsType
    },
    res: Response,
    next: NextFunction
  ) => {
    const { titleEn, titleFr, isPublished } = req.body

    if (titleEn) {
      req.body.slugEn = slugify(titleEn, { lower: true })

      const courseExist = await getSingleCourseByQuery({
        slugEn: req.body.slugEn,
      })

      if (courseExist)
        return next(
          new ErrorResponse(req.t('error.course.titleEn_exists'), 400)
        )
    }

    if (titleFr) {
      req.body.slugFr = slugify(titleFr, { lower: true })

      const courseExist = await getSingleCourseByQuery({
        slugFr: req.body.slugFr,
      })

      if (courseExist)
        return next(
          new ErrorResponse(req.t('error.course.titleFr_exists'), 400)
        )
    }

    // Publishing a course
    if (req.method === 'POST' && isPublished)
      return next(new ErrorResponse(`You can't publish this course yet`, 400))

    if (req.method === 'PATCH' && isPublished) {
      // Make sure these fields are required when publishing
      const course = req.course!
      const courseHasAllRequiredFields = checkRequiredFields(course, [
        'titleEn',
        'titleFr',
        'deliveryMode',
        'days',
        'audience',
        'language',
        'objectiveEn',
        'objectiveFr',
        'curriculumEn',
        'curriculumFr',
        'prices',
        'cohorts',
        'schedules',
      ])

      const courseHasActiveCohort = course.cohorts.some(
        ({ isActive }) => isActive
      )

      const canPublishCourse =
        courseHasAllRequiredFields && courseHasActiveCohort

      if (!canPublishCourse)
        return next(
          new ErrorResponse(
            `You can't publish this course yet, make sure you provide all information needed for this course and have a cohort under this course set as active`,
            400
          )
        )
    }

    req.body.userId = req.user!.id

    next()
  }
)

export const getSingleCourseByQueryMiddleware = asyncHandler(
  async (
    req: SingleCourseByQueryRequestType,
    res: Response,
    next: NextFunction
  ) => {
    const { identifier } = req.params

    let courseId: string | undefined = undefined
    if (req.params.courseId) courseId = req.params.courseId
    if (req.body.courseId) courseId = req.body.courseId

    const query: Partial<Pick<CourseType, 'id' | 'slugEn' | 'slugFr'>> = {}

    if (
      identifier === undefined &&
      courseId === undefined &&
      Object.entries(query).length === 0
    )
      return next(
        new ErrorResponse(req.t('error.course.courseId.required'), 404)
      )

    switch (req.query.identifier) {
      case undefined:
        query.id = identifier
        break
      case 'id':
        query.id = identifier
        break
      case 'slugEn':
        query.slugEn = identifier
        break
      case 'slugFr':
        query.slugFr = identifier
        break

      default:
        break
    }

    const course = await getSingleCourseByQuery(
      courseId ? { id: courseId } : query
    )

    if (course === undefined)
      return next(new ErrorResponse(req.t('error.course.not_found'), 404))

    req.course = course

    next()
  }
)
