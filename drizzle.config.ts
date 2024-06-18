dotenv.config()
import * as dotenv from 'dotenv'

import { defineConfig } from 'drizzle-kit'

console.log(process.env.DATABASE_URL!)

export default defineConfig({
  schema: './src/api/v1/db/db.schema.ts',
  out: './src/api/v1/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  verbose: true,
  strict: true,
})
