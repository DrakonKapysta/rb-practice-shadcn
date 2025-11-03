import { mutationOptions } from '@tanstack/react-query'

import { EAuthQueryKey, ILogin, IRegister, IRevokeSessionQuery } from '@/app/(client)/entities/models'
import { ICallbackResult } from '@/app/(client)/shared/interfaces'
import { loggerUtil } from '@/pkg/utils/logger'

import {
  credentialsLogin,
  credentialsRegister,
  logout,
  revokeAllSessions,
  revokeOtherSessions,
  revokeSession,
} from './auth.api'
import { getQueryClient } from '@/pkg/libraries/rest-api'

const queryClient = getQueryClient()

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

export const authRevokeSessionMutationOptions = () => {
  return mutationOptions({
    mutationFn: (data: IRevokeSessionQuery) => revokeSession(data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [EAuthQueryKey.AUTH_SESSIONS] })
    },

    onError: (error) => {
      loggerUtil({ text: 'RevokeSessionMutationOptions', value: error.message, level: 'error' })
    },
  })
}

export const authRevokeAllSessionsMutationOptions = () => {
  return mutationOptions({
    mutationFn: (data: ICallbackResult) => revokeAllSessions(data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [EAuthQueryKey.AUTH_SESSIONS] })
    },

    onError: (error) => {
      loggerUtil({ text: 'RevokeAllSessionsMutationOptions', value: error.message, level: 'error' })
    },
  })
}

export const authRevokeOtherSessionsMutationOptions = () => {
  return mutationOptions({
    mutationFn: (data: ICallbackResult) => revokeOtherSessions(data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [EAuthQueryKey.AUTH_SESSIONS] })
    },

    onError: (error) => {
      loggerUtil({ text: 'RevokeOtherSessionsMutationOptions', value: error.message, level: 'error' })
    },
  })
}
