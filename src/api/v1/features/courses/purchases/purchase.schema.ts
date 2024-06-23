import { bigint, pgEnum, pgTable, timestamp, uuid } from 'drizzle-orm/pg-core'
import courses from '../course.schema'
import { relations } from 'drizzle-orm'
import users from '../../users/user.schema'
import coursePrices from '../prices/price.schema'

export const purchasePaymentStatusEnum = pgEnum('purchase_payment_status', [
  'pending',
  'paid',
  'cancelled',
])

const coursePurchases = pgTable('course_purchases', {
  id: uuid('id').primaryKey().defaultRandom().notNull(),
  courseId: uuid('course_id')
    .references(() => courses.id)
    .notNull(),
  userId: uuid('user_id')
    .references(() => users.id)
    .notNull(),
  coursePriceId: uuid('course_price_id')
    .references(() => coursePrices.id)
    .notNull(),
  paymentStatus: purchasePaymentStatusEnum('payment_status').default('pending'),
  paidAt: timestamp('paid_at', { mode: 'string' }),
  paystackTransactionId: bigint('paystack_transaction_id', { mode: 'bigint' }),
  createdAt: timestamp('created_at', { mode: 'string' }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'string' }).defaultNow(),
})

export const coursePurchasesRelations = relations(
  coursePurchases,
  ({ one }) => ({
    course: one(courses, {
      fields: [coursePurchases.courseId],
      references: [courses.id],
    }),
    user: one(users, {
      fields: [coursePurchases.userId],
      references: [users.id],
    }),
    price: one(coursePrices, {
      fields: [coursePurchases.coursePriceId],
      references: [coursePrices.id],
    }),
  })
)

export default coursePurchases
