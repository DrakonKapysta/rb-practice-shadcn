import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { nextCookies } from 'better-auth/next-js'
import { admin as adminPlugin, openAPI } from 'better-auth/plugins'
import { Redis } from 'ioredis'

import { envServer } from '@/config/env'
import { account, db, session, user, verification } from '@/pkg/libraries/drizzle'

import { fields } from './fields'
import { accessControl, admin, super_admin, user as userPermission } from './permissions'
import sendEmail from '@/pkg/libraries/nodemailer/send-email'

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
  socialProviders: {
    google: {
      prompt: 'select_account',
      clientId: envServer.GOOGLE_CLIENT_ID ?? '',
      clientSecret: envServer.GOOGLE_CLIENT_SECRET ?? '',
    },
  },
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url }) => {
      await sendEmail(
        user.email,
        'Reset your password',
        `
          <h2>Hello ${user.name || 'there'},</h2>
          <p>You requested a password reset.</p>
          <p>Click the link below to set a new password:</p>
          <p><a href="${url}">${url}</a></p>
          <p>If you didn’t request this, just ignore this email.</p>
        `,
      )
    },
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
