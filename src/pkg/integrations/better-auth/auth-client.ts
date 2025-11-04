'use client'

import { adminClient, inferAdditionalFields } from 'better-auth/client/plugins'
import { createAuthClient } from 'better-auth/react'

import { envClient } from '@/config/env'

import type { auth } from './auth'
import { accessControl, admin, super_admin, user } from './permissions'

export const authClient = createAuthClient({
  baseURL: envClient.NEXT_PUBLIC_CLIENT_WEB_URL,
  plugins: [
    adminClient({ ac: accessControl, roles: { super_admin, admin, user } }),
    inferAdditionalFields<typeof auth>(),
  ],
})

export type Session = typeof authClient.$Infer.Session
