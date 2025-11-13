'use server'

import { format } from 'date-fns'
import { cacheLife, cacheTag, updateTag } from 'next/cache'
import { cookies, headers } from 'next/headers'
import { getLocale } from 'next-intl/server'

import { IChangePassword, IUpdateUser } from '@/app/(client)/entities/models'
import { auth, Session } from '@/pkg/integrations/better-auth'
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

    return { success: false, error: { message: (error as Error).message }, statusCode: 500 }
  }
}

export async function changeEmailOnServer(newEmail: string) {
  try {
    const response: { status: boolean; message?: string } = await auth.api.changeEmail({
      body: {
        newEmail,
      },
      headers: await headers(),
    })

    if (!response.status) {
      return { success: false, error: { message: response.message || 'Failed to change email' } }
    }

    return { success: true, result: response }
  } catch (error) {
    loggerUtil({ text: 'AuthServerApi.changeEmail', value: error, level: 'error' })

    return { success: false, error: { message: (error as Error).message, statusCode: 500 } }
  }
}

export async function changePasswordOnServer(data: IChangePassword) {
  try {
    const response = (await auth.api.changePassword({
      body: {
        currentPassword: data.password,
        newPassword: data.newPassword,
        revokeOtherSessions: data.revokeOtherSessions,
      },

      headers: await headers(),
    })) as { token: string | null; user: Session['user'] } | { message: string }

    if ('message' in response) {
      return { success: false, error: { message: response.message || 'Failed to change password' } }
    }

    return { success: true, result: response }
  } catch (error) {
    loggerUtil({ text: 'AuthServerApi.changePassword', value: error, level: 'error' })

    return { success: false, error: { message: (error as Error).message, statusCode: 500 } }
  }
}

export async function listSessionsOnServer() {
  try {
    const response = await auth.api.listSessions({
      headers: await headers(),
    })

    if ('message' in response) {
      return { success: false, error: { message: response.message || 'Failed to list sessions' } }
    }

    return { success: true, result: response }
  } catch (error) {
    loggerUtil({ text: 'AuthServerApi.listSessions', value: error, level: 'error' })

    return { success: false, error: { message: (error as Error).message, statusCode: 500 } }
  }
}

export async function revokeSessionOnServer(sessionToken: string) {
  try {
    const response = await auth.api.revokeSession({
      body: {
        token: sessionToken,
      },
      headers: await headers(),
    })

    if ('message' in response && typeof response.message === 'string') {
      return { success: false, error: { message: response.message || 'Failed to revoke session' } }
    }

    return { success: true, result: response }
  } catch (error) {
    loggerUtil({ text: 'AuthServerApi.revokeSession', value: error, level: 'error' })

    return { success: false, error: { message: (error as Error).message, statusCode: 500 } }
  }
}

export async function revokeAllSessionsOnServer() {
  try {
    const response = await auth.api.revokeSessions({
      headers: await headers(),
    })

    if ('message' in response && typeof response.message === 'string') {
      return { success: false, error: { message: response.message || 'Failed to revoke all sessions' } }
    }

    return { success: true, result: response }
  } catch (error) {
    loggerUtil({ text: 'AuthServerApi.revokeAllSessions', value: error, level: 'error' })

    return { success: false, error: { message: (error as Error).message, statusCode: 500 } }
  }
}

export async function revokeOtherSessionsOnServer() {
  try {
    const response = await auth.api.revokeOtherSessions({
      headers: await headers(),
    })

    if ('message' in response && typeof response.message === 'string') {
      return { success: false, error: { message: response.message || 'Failed to revoke other sessions' } }
    }

    return { success: true, result: response }
  } catch (error) {
    loggerUtil({ text: 'AuthServerApi.revokeOtherSessions', value: error, level: 'error' })

    return { success: false, error: { message: (error as Error).message, statusCode: 500 } }
  }
}
