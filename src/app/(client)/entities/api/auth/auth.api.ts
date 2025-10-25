import { ILogin, ILoginResponse, IRegister, IRegisterResponse } from '@/app/(client)/entities/models'
import { authClient } from '@/pkg/integrations/better-auth/auth-client'

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
    return { success: false, error: { message: (error as Error).message, statusCode: 500 } }
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
    return { success: false, error: { message: (error as Error).message, statusCode: 400 } }
  }
}
