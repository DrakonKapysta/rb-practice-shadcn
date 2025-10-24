import { ILogin, ILoginResponse, IRegister, IRegisterResponse } from '@/app/(client)/entities/models'
import { authClient } from '@/pkg/integrations/better-auth/auth-client'

export async function credentialsLogin(loginData: ILogin): Promise<ILoginResponse> {
  try {
    await authClient.signIn.email({
      email: loginData.email,
      password: loginData.password,
    })
    return { success: true }
  } catch (error) {
    return { success: false, error: { message: (error as Error).message, statusCode: 400 } }
  }
}

export async function credentialsRegister(registerData: IRegister): Promise<IRegisterResponse> {
  try {
    await authClient.signUp.email({
      name: registerData.name,
      email: registerData.email,
      password: registerData.password,
    })
    return { success: true }
  } catch (error) {
    return { success: false, error: { message: (error as Error).message, statusCode: 400 } }
  }
}
