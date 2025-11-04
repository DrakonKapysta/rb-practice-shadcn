import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { nextCookies } from 'better-auth/next-js'
import { admin as adminPlugin, openAPI } from 'better-auth/plugins'
import { Redis } from 'ioredis'

import { envServer } from '@/config/env'
import { account, db, session, user, verification } from '@/pkg/libraries/drizzle'

import { fields } from './fields'
import { accessControl, admin, super_admin, user as userPermission } from './permissions'

const redis = envServer.NODE_ENV === 'development' ? new Redis() : undefined

export const auth = betterAuth({
  user: {
    additionalFields: {
      ...fields,
    },
    changeEmail: {
      enabled: true,
    },
  },
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: {
      user,
      account,
      verification,
      session,
    },
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    nextCookies(),
    openAPI(),
    adminPlugin({ ac: accessControl, roles: { super_admin, admin, userPermission } }),
  ],
  secondaryStorage:
    envServer.NODE_ENV === 'development'
      ? {
          get: async (key: string) => {
            return await redis?.get(key)
          },

          set: async (key: string, value: string, ttl) => {
            if (ttl) await redis?.set(key, value, 'EX', ttl)
            else await redis?.set(key, value)
          },

          delete: async (key: string) => {
            await redis?.del(key)
          },
        }
      : undefined,
})

export type Session = typeof auth.$Infer.Session
