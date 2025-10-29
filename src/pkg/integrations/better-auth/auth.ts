import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { nextCookies } from 'better-auth/next-js'
import { admin, openAPI } from 'better-auth/plugins'

import { envServer } from '@/config/env'
import { db } from '@/pkg/libraries/drizzle'

export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: 'pg' }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [nextCookies(), openAPI(), admin()],
  baseURL: envServer.BETTER_AUTH_URL,
  allowedOrigins: [envServer.BETTER_AUTH_URL],
})

export type Session = typeof auth.$Infer.Session
