import { relations } from 'drizzle-orm'
import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  text,
  time,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core'
import courseSchedules from './schedules/schedule.schema'
import coursePrices from './prices/price.schema'
import users from '../users/user.schema'

export const courseDeliveryModeEnum = pgEnum('course_delivery_mode', [
  'in-person',
  'online',
])

export const courseDurationPeriodEnum = pgEnum('course_duration_period', [
  'days',
  'weeks',
  'months',
  'years',
])

export const courseAudienceEnum = pgEnum('course_audience', ['adults', 'kids'])

enum Days {
  SUNDAYS = 'sundays',
  MONDAYS = 'mondays',
  TUESDAYS = 'tuesdays',
  WEDNESDAYS = 'wednesdays',
  THURSDAYS = 'thursdays',
  FRIDAYS = 'fridays',
  SATURDAYS = 'saturdays',
}

const courses = pgTable('courses', {
  id: uuid('id').primaryKey().defaultRandom().notNull(),
  image: varchar('image'),
  titleEn: varchar('title_en', { length: 256 }).unique(),
  titleFr: varchar('title_fr', { length: 256 }).unique(),
  slugEn: varchar('slug_en', { length: 256 }).unique(),
  slugFr: varchar('slug_fr', { length: 256 }).unique(),
  deliveryMode: courseDeliveryModeEnum('delivery_mode'),
  days: text('days').array().$type<Array<Days>>(),
  startTime: time('start_time'),
  endTime: time('end_time'),
  durationValue: integer('duration_value'),
  durationPeriod: courseDurationPeriodEnum('duration_period'),
  audience: courseAudienceEnum('audience'),
  objective: text('objective'),
  curriculum: text('curriculum'),
  userId: uuid('user_id')
    .references(() => users.id)
    .notNull(),
  isPublished: boolean('is_published').default(false).notNull(),
  createdAt: timestamp('created_at', { mode: 'string' }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'string' }).defaultNow(),
})

export const coursesRelations = relations(courses, ({ one, many }) => ({
  user: one(users, {
    fields: [courses.userId],
    references: [users.id],
  }),
  courseSchedules: many(courseSchedules),
  coursePrices: many(coursePrices),
}))

export default courses
