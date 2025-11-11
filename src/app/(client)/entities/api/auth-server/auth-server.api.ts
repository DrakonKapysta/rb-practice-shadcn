'use server'

import { cacheLife, cacheTag } from 'next/cache'
import { headers } from 'next/headers'

import { auth } from '@/pkg/integrations/better-auth'
import { redirect, routing } from '@/pkg/libraries/locale'
import { loggerUtil } from '@/pkg/utils/logger'

export async function getSession() {
  'use cache: private'
  cacheLife({ stale: 60 })
  cacheTag('session')

  try {
    const data = await auth.api.getSession({
      headers: await headers(),
    })

    return data
  } catch (error) {
    loggerUtil({ text: 'AuthServerApi.getSession', value: (error as Error).message, level: 'error' })
  }

  redirect({ href: '/login', locale: routing.defaultLocale })
}
