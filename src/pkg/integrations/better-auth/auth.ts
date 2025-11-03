import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { nextCookies } from 'better-auth/next-js'
import { admin as adminPlugin, openAPI } from 'better-auth/plugins'
import { Redis } from 'ioredis'

import { envServer } from '@/config/env'
import { db } from '@/pkg/libraries/drizzle'

import { accessControl, admin, super_admin, user } from './permissions'

const redis = new Redis()

export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: 'pg' }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [nextCookies(), openAPI(), adminPlugin({ ac: accessControl, roles: { super_admin, admin, user } })],
  baseURL: typeof window !== 'undefined' ? window.location.origin : envServer.BETTER_AUTH_URL,
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
