import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import * as schema from './schema'

const connectionString =
  process.env.DATABASE_URL ??
  process.env.NEON_POSTGRES_URL ??
  process.env.NEON_DATABASE_URL ??
  process.env.NEON_POSTGRES_PRISMA_URL ??
  process.env.NEON_POSTGRES_URL_NON_POOLING

export const pool = connectionString ? new Pool({ connectionString }) : null

export const db = pool ? drizzle(pool, { schema }) : null
