import * as dotenv from 'dotenv'
dotenv.config()

import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './db.schema'

const connection = postgres(process.env.DATABASE_URL!)
export const db = drizzle(connection, { schema })
