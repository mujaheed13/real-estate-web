import { betterAuth } from 'better-auth'
import { Pool } from 'pg'

function getAuth() {
  const url = [
    process.env.DATABASE_URL,
    process.env.NEON_POSTGRES_URL,
    process.env.NEON_DATABASE_URL,
    process.env.NEON_POSTGRES_PRISMA_URL,
    process.env.NEON_POSTGRES_URL_NON_POOLING,
  ].find((value) => Boolean(value && (value.startsWith('postgres://') || value.startsWith('postgresql://'))))
  if (!url) throw new Error('A valid Neon database connection string is required')

  const pool = new Pool({ connectionString: url })

  const baseURL =
    process.env.BETTER_AUTH_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : undefined) ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined) ||
    process.env.V0_RUNTIME_URL

  const trustedOrigins = [
    baseURL,
    process.env.VERCEL_PROJECT_PRODUCTION_URL &&
      `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`,
    process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`,
    process.env.V0_RUNTIME_URL,
  ].filter(Boolean) as string[]

  return betterAuth({
    database: pool,
    secret: process.env.BETTER_AUTH_SECRET,
    baseURL,
    trustedOrigins,
    emailAndPassword: {
      enabled: true,
      minPasswordLength: 8,
    },
    advanced: {
      defaultCookieAttributes:
        process.env.NODE_ENV === 'development'
          ? {
              sameSite: 'none',
              secure: true,
            }
          : undefined,
    },
  })
}

let authInstance: any = null

export function getAuthInstance() {
  if (!authInstance) {
    authInstance = getAuth()
  }
  return authInstance
}

// For backward compatibility
export const auth = new Proxy(
  {},
  {
    get: (target, prop) => {
      return getAuthInstance()[prop as string]
    },
  }
) as any
