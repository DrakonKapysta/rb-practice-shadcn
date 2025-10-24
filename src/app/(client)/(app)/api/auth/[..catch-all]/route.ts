import { toNextJsHandler } from 'better-auth/next-js'

import { auth } from '@/pkg/integrations/better-auth/auth'

export const { POST, GET } = toNextJsHandler(auth)
