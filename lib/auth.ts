import { betterAuth } from 'better-auth'
import { Pool } from 'pg'

function isPostgresConnectionString(value: string | undefined): value is string {
  return Boolean(value?.startsWith('postgres://') || value?.startsWith('postgresql://'))
}

const connectionString = [
  process.env.DATABASE_URL,
  process.env.NEON_POSTGRES_URL,
  process.env.NEON_DATABASE_URL,
  process.env.NEON_POSTGRES_PRISMA_URL,
  process.env.NEON_POSTGRES_URL_NON_POOLING,
].find(isPostgresConnectionString)

if (!connectionString) {
  throw new Error('A valid Neon database connection string is required')
}

const baseURL =
  process.env.BETTER_AUTH_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : process.env.V0_RUNTIME_URL)

const trustedOrigins = [
  ...(process.env.NODE_ENV === 'development'
    ? [
        'http://localhost:3000',
        process.env.V0_RUNTIME_URL,
        process.env.V0_DEV_APP_URL,
        process.env.V0_BUILD_URL,
        process.env.V0_SANDBOX_URL,
      ]
    : []),
  ...(process.env.NODE_ENV === 'production'
    ? [
        process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`,
        process.env.VERCEL_PROJECT_PRODUCTION_URL &&
          `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`,
      ]
    : []),
].filter(Boolean) as string[]

export const auth = betterAuth({
  database: new Pool({ connectionString }),
  baseURL,
  trustedOrigins,
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    minPasswordLength: 8,
  },
  ...(process.env.NODE_ENV === 'development'
    ? {
        advanced: {
          defaultCookieAttributes: {
            sameSite: 'none' as const,
            secure: true,
          },
        },
      }
    : {}),
})
