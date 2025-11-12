'use server'

import { format } from 'date-fns'
import { cacheLife, cacheTag, updateTag } from 'next/cache'
import { cookies, headers } from 'next/headers'
import { getLocale } from 'next-intl/server'

import { IUpdateUser } from '@/app/(client)/entities/models'
import { auth } from '@/pkg/integrations/better-auth'
import { redirect } from '@/pkg/libraries/locale'
import { loggerUtil } from '@/pkg/utils/logger'

export async function clearSession() {
  const cookieStore = await cookies()

  if (cookieStore.has('better-auth.session_token')) {
    cookieStore.delete('better-auth.session_token')

    const locale = await getLocale()

    updateTag('session')

    redirect({ href: '/login', locale })
  }
}

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
}

export async function updateUserOnServer(data: IUpdateUser) {
  try {
    const response: { status: boolean; message?: string } = await auth.api.updateUser({
      body: {
        name: data.name ?? undefined,
        surname: data.surname ?? undefined,
        phoneNumber: data.phoneNumber ?? undefined,
        address: data.address ?? undefined,
        country: data.country ?? undefined,
        birthDate: data.birthDate
          ? (new Date(format(data.birthDate, 'yyyy-MM-dd')).toISOString() as unknown as Date)
          : undefined,
        gender: data.gender ?? undefined,
      },
      headers: await headers(),
    })

    if (!response.status) {
      return { success: false, error: { message: response.message || 'Failed to update user' } }
    }

    return { success: true, result: response.status }
  } catch (error) {
    loggerUtil({ text: 'AuthServerApi.updateUser', value: error, level: 'error' })

    return { success: false, error: { message: 'Failed to update user' }, statusCode: 500 }
  }
}
