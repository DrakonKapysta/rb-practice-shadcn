import {
  IAdminUsersQuery,
  IBannUserQuery,
  IImpersonateUserQuery,
  IRevokeSessionQuery,
  ISetRoleQuery,
  IUnbanUserQuery,
} from '@/app/(client)/entities/models'
import { ICallbackResult } from '@/app/(client)/shared/interfaces'
import { authClient } from '@/pkg/integrations/better-auth/auth-client'
import { loggerUtil } from '@/pkg/utils/logger'

export async function getUsers(query: IAdminUsersQuery) {
  try {
    const response = await authClient.admin.listUsers(
      {
        query: {
          limit: query.limit,
          offset: query.offset,
          sortBy: query.sortBy,
          sortDirection: query.sortDirection,
        },
      },
      {
        onSuccess: () => {
          query.successCallback?.()
        },
        onError: (error) => {
          query.errorCallback?.(error)
        },
        onRequest: () => {
          query.requestCallback?.()
        },
      },
    )

    if (response.error) {
      return { success: false, error: { message: response.error.message, statusCode: response.error.code } }
    }

    return { success: true, data: response.data }
  } catch (error) {
    loggerUtil({ text: 'Error fetching users', value: error })

    throw error
  }
}

export async function banUser(data: IBannUserQuery) {
  try {
    const response = await authClient.admin.banUser(
      {
        userId: data.userId,
        banReason: data.banReason,
        banExpiresIn: data.banExpiresIn,
      },
      {
        onSuccess: () => {
          data.successCallback?.()
        },
        onError: (error) => {
          data.errorCallback?.(error)
        },
        onRequest: () => {
          data.requestCallback?.()
        },
      },
    )

    if (response.error) {
      return { success: false, error: { message: response.error.message, statusCode: response.error.code } }
    }

    return { success: true, data: response.data }
  } catch (error) {
    loggerUtil({ text: 'Error fetching users', value: error })

    throw error
  }
}

export async function unbanUser(data: IUnbanUserQuery) {
  try {
    const response = await authClient.admin.unbanUser(
      {
        userId: data.userId,
      },
      {
        onSuccess: () => {
          data.successCallback?.()
        },
        onError: (error) => {
          data.errorCallback?.(error)
        },
        onRequest: () => {
          data.requestCallback?.()
        },
      },
    )

    if (response.error) {
      return { success: false, error: { message: response.error.message, statusCode: response.error.code } }
    }

    return { success: true, data: response.data }
  } catch (error) {
    loggerUtil({ text: 'Error fetching users', value: error })

    throw error
  }
}

export async function setRole(data: ISetRoleQuery) {
  try {
    const response = await authClient.admin.setRole(
      {
        userId: data.userId,
        role: data.role,
      },
      {
        onSuccess: () => {
          data.successCallback?.()
        },
        onError: (error) => {
          data.errorCallback?.(error)
        },
      },
    )

    if (response.error) {
      return { success: false, error: { message: response.error.message, statusCode: response.error.code } }
    }
  } catch (error) {
    loggerUtil({ text: 'Error setting role', value: error })

    throw error
  }
}

export async function impersonateUser(data: IImpersonateUserQuery) {
  try {
    const response = await authClient.admin.impersonateUser(
      { userId: data.userId },
      {
        onSuccess: () => {
          data.successCallback?.()
        },
        onError: (error) => {
          data.errorCallback?.(error)
        },
      },
    )

    if (response.error) {
      return { success: false, error: { message: response.error.message, statusCode: response.error.code } }
    }

    return { success: true, data: response.data }
  } catch (error) {
    loggerUtil({ text: 'Error impersonating user', value: error })

    throw error
  }
}

export async function stopImpersonating(data: ICallbackResult) {
  try {
    const response = await authClient.admin.stopImpersonating(
      {},

      {
        onSuccess: () => {
          data.successCallback?.()
        },
        onError: (error) => {
          data.errorCallback?.(error)
        },
      },
    )

    if (response.error) {
      return { success: false, error: { message: response.error.message, statusCode: response.error.code } }
    }

    return { success: true, data: response.data }
  } catch (error) {
    loggerUtil({ text: 'Error stopping impersonating', value: error })

    throw error
  }
}
