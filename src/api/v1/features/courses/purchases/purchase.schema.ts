import {
  bigint,
  integer,
  pgEnum,
  pgTable,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import users from '../../users/user.schema'
import classes from '../../classes/class.schema'
import cohorts from '../cohorts/cohort.schema'

export const purchasePaymentStatusEnum = pgEnum('purchase_payment_status', [
  'pending',
  'paid',
  'cancelled',
])

const coursePurchases = pgTable('course_purchases', {
  id: uuid('id').primaryKey().defaultRandom().notNull(),
  amount: integer('amount').notNull(),
  classId: uuid('class_id')
    .references(() => classes.id)
    .notNull(),
  cohortId: uuid('cohort_id')
    .references(() => cohorts.id)
    .notNull(),
  userId: uuid('user_id')
    .references(() => users.id)
    .notNull(),
  paymentStatus: purchasePaymentStatusEnum('payment_status').default('pending'),
  paidAt: timestamp('paid_at', { mode: 'string' }),
  paystackTransactionId: bigint('paystack_transaction_id', { mode: 'number' }),
  createdAt: timestamp('created_at', { mode: 'string' }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'string' }).defaultNow(),
})

export const coursePurchasesRelations = relations(
  coursePurchases,
  ({ one }) => ({
    class: one(classes, {
      fields: [coursePurchases.classId],
      references: [classes.id],
    }),
    cohort: one(cohorts, {
      fields: [coursePurchases.cohortId],
      references: [cohorts.id],
    }),
    user: one(users, {
      fields: [coursePurchases.userId],
      references: [users.id],
    }),
  })
)

export default coursePurchases
