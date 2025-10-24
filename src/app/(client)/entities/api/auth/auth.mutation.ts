import { mutationOptions } from '@tanstack/react-query'

import { ILogin, IRegister } from '@/app/(client)/entities/models'
import { loggerUtil } from '@/pkg/utils/logger'

import { credentialsLogin, credentialsRegister } from './auth.api'

export const loginMutationOptions = () => {
  return mutationOptions({
    mutationFn: (loginData: ILogin) => credentialsLogin(loginData),

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
