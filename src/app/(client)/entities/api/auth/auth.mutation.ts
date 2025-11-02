import { mutationOptions } from '@tanstack/react-query'

import { ILogin, IRegister } from '@/app/(client)/entities/models'
import { ICallbackResult } from '@/app/(client)/shared/interfaces'
import { loggerUtil } from '@/pkg/utils/logger'

import { credentialsLogin, credentialsRegister, logout } from './auth.api'

export const loginMutationOptions = () => {
  return mutationOptions({
    mutationFn: (data: ILogin) => credentialsLogin(data),

    onError: (error) => {
      loggerUtil({ text: 'LoginMutationOptions', value: error.message, level: 'error' })
    },
  })
}

export const registerMutationOptions = () => {
  return mutationOptions({
    mutationFn: (registerData: IRegister) => credentialsRegister(registerData),

    onError: (error) => {
      loggerUtil({ text: 'RegisterMutationOptions', value: error.message, level: 'error' })
    },
  })
}

export const logoutMutationOptions = () => {
  return mutationOptions({
    mutationFn: (data: ICallbackResult) => logout(data),

    onError: (error) => {
      loggerUtil({ text: 'LogoutMutationOptions', value: error.message, level: 'error' })
    },
  })
}
