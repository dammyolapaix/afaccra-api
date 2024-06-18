import * as dotenv from 'dotenv'
dotenv.config()

import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import postgres from 'postgres'
import config from '../../../../drizzle.config'

const connection = postgres(process.env.DATABASE_URL!, { max: 1 })
const db = drizzle(connection)

const migrateDB = async () => {
  console.log('Migrating...')
  await migrate(db, { migrationsFolder: config.out! })
  await connection.end()
  console.log('Migration ended')
}

migrateDB()
