'use client'

import { adminClient } from 'better-auth/client/plugins'
import { createAuthClient } from 'better-auth/react'

import { envClient } from '@/config/env'

import { accessControl, admin, super_admin, user } from './permissions'

export const authClient = createAuthClient({
  baseURL: typeof window !== 'undefined' ? window.location.origin : envClient.NEXT_PUBLIC_CLIENT_WEB_URL,
  plugins: [adminClient({ ac: accessControl, roles: { super_admin, admin, user } })],
})
