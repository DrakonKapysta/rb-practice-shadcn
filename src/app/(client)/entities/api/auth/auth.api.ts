import { ILogin, ILoginResponse, IRegister, IRegisterResponse } from '@/app/(client)/entities/models'
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

export async function credentialsRegister(registerData: IRegister): Promise<IRegisterResponse> {
  try {
    await authClient.signUp.email(
      {
        name: registerData.credentials.name,
        email: registerData.credentials.email,
        password: registerData.credentials.password,
      },

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
