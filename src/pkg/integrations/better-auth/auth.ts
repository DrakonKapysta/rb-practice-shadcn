import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { nextCookies } from 'better-auth/next-js'

import { db } from '@/pkg/libraries/drizzle'
import { envClient } from '@/config/env'

export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: 'pg' }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [nextCookies()],
  baseURL: envClient.NEXT_PUBLIC_CLIENT_WEB_URL,
  allowedOrigins: [envClient.NEXT_PUBLIC_CLIENT_WEB_URL],
})
