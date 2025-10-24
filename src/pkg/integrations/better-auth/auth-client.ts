import { envClient } from '@/config/env'
import { createAuthClient } from 'better-auth/react'
export const authClient = createAuthClient({
  baseURL: envClient.NEXT_PUBLIC_CLIENT_WEB_URL,
})
