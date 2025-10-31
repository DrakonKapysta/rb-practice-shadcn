import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { nextCookies } from 'better-auth/next-js'
import { admin, openAPI } from 'better-auth/plugins'

import { Redis } from 'ioredis'

import { envServer } from '@/config/env'
import { db } from '@/pkg/libraries/drizzle'

const redis = new Redis()

export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: 'pg' }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [nextCookies(), openAPI(), admin()],
  baseURL: envServer.BETTER_AUTH_URL,
  allowedOrigins: [envServer.BETTER_AUTH_URL],
  secondaryStorage:
    envServer.NODE_ENV === 'development'
      ? {
          get: async (key: string) => {
            return await redis.get(key)
          },
          set: async (key: string, value: string, ttl) => {
            if (ttl) await redis.set(key, value, 'EX', ttl)
            else await redis.set(key, value)
          },
          delete: async (key: string) => {
            await redis.del(key)
          },
        }
      : undefined,
})

export type Session = typeof auth.$Infer.Session
