import { format } from 'date-fns'

import {
  IChangeEmail,
  IChangePassword,
  ILogin,
  ILoginResponse,
  IRegister,
  IRegisterResponse,
  IResetPassword,
  IResetPasswordRequest,
  IRevokeSessionQuery,
  IUpdateUser,
} from '@/app/(client)/entities/models'
import { ICallbackResult, IResult } from '@/app/(client)/shared/interfaces'
import { authClient } from '@/pkg/integrations/better-auth/auth-client'
import { loggerUtil } from '@/pkg/utils/logger'

export async function credentialsLogin(data: ILogin): Promise<ILoginResponse> {
  try {
    await authClient.signIn.email(
      {
        email: data.credentials.email,
        password: data.credentials.password,
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

    return { success: true }
  } catch (error) {
    loggerUtil({ text: 'Error logging in', value: error })

    throw error
  }
}

export async function googleLogin(data: ICallbackResult) {
  try {
    const response = await authClient.signIn.social(
      { provider: 'google' },
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

    return { success: true, result: response.data }
  } catch (error) {
    loggerUtil({ text: 'Error logging in with Google', value: error })
  }
}

export async function credentialsRegister(registerData: IRegister): Promise<IRegisterResponse> {
  try {
    await authClient.signUp.email(
      {
        name: registerData.credentials.name,
        email: registerData.credentials.email,
        password: registerData.credentials.password,
      } as Parameters<typeof authClient.signUp.email>[0],

      {
        onSuccess: () => {
          registerData.successCallback?.()
        },

        onError: (error) => {
          registerData.errorCallback?.(error)
        },

        onRequest: () => {
          registerData.requestCallback?.()
        },
      },
    )

    return { success: true }
  } catch (error) {
    loggerUtil({ text: 'Error registering user', value: error })

    throw error
  }
}

export async function logout(data: ICallbackResult): Promise<IResult<boolean>> {
  try {
    const response = await authClient.signOut(
      {},

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
      return {
        success: false,
        error: {
          message: response.error.message || 'Failed to logout',
          statusCode: Number(response.error.code) || 500,
        },
      }
    }

    return { success: true, result: true }
  } catch (error) {
    loggerUtil({ text: 'Error logging out', value: error })

    throw error
  }
}

export async function requestResetPassword(data: IResetPasswordRequest) {
  try {
    const result = await authClient.requestPasswordReset(
      {
        email: data.email,
        redirectTo: data.redirectTo,
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

    if (result.error) {
      return { success: false, error: { message: result.error.message, statusCode: result.error.code } }
    }

    return { success: true, result: result.data }
  } catch (error) {
    loggerUtil({ text: 'Error sending reset password', value: error, level: 'error' })
    throw error
  }
}

export async function resetPassword(data: IResetPassword) {
  try {
    const response = await authClient.resetPassword(
      {
        token: data.token,
        newPassword: data.password,
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

    return { success: true, result: response.data }
  } catch (error) {
    loggerUtil({ text: 'Error resetting password', value: error })
    throw error
  }
}

export async function updateUser(data: IUpdateUser) {
  try {
    const response = await authClient.updateUser(
      {
        name: data.name ?? undefined,
        surname: data.surname ?? undefined,
        phoneNumber: data.phoneNumber ?? undefined,
        address: data.address ?? undefined,
        country: data.country ?? undefined,
        birthDate: data.birthDate ? new Date(format(data.birthDate, 'yyyy-MM-dd')) : undefined,
        gender: data.gender ?? undefined,
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

    return { success: true, result: response.data }
  } catch (error) {
    loggerUtil({ text: 'Error updating user', value: error })
    throw error
  }
}

export async function listSessions() {
  try {
    const response = await authClient.listSessions()

    if (response.error) {
      return {
        success: false,
        error: {
          message: response.error.message || 'Failed to list sessions',
          statusCode: Number(response.error.code) || 500,
        },
      }
    }

    return { success: true, result: response.data }
  } catch (error) {
    loggerUtil({ text: 'Error listing sessions', value: error })

    throw error
  }
}

export async function revokeSession(data: IRevokeSessionQuery) {
  try {
    const response = await authClient.revokeSession(
      {
        token: data.sessionToken,
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

    return { success: true, data: response.data }
  } catch (error) {
    loggerUtil({ text: 'Error revoking session', value: error })

    throw error
  }
}

export async function revokeAllSessions(data: ICallbackResult) {
  try {
    const response = await authClient.revokeSessions(
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
    loggerUtil({ text: 'Error revoking all sessions', value: error })

    throw error
  }
}

export async function revokeOtherSessions(data: ICallbackResult) {
  try {
    const response = await authClient.revokeOtherSessions(
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
    loggerUtil({ text: 'Error revoking other sessions', value: error })

    throw error
  }
}

export async function changeEmail(data: IChangeEmail) {
  try {
    const response = await authClient.changeEmail(
      {
        newEmail: data.email,
        callbackURL: data.callbackURL,
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

    return { success: true, data: response.data }
  } catch (error) {
    loggerUtil({ text: 'Error changing email', value: error })

    throw error
  }
}

export async function changePassword(data: IChangePassword) {
  try {
    const response = await authClient.changePassword(
      {
        newPassword: data.newPassword,
        currentPassword: data.password,
        revokeOtherSessions: data.revokeOtherSessions,
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

    return { success: true, data: response.data }
  } catch (error) {
    loggerUtil({ text: 'Error changing password', value: error })

    throw error
  }
}
