import { mutationOptions } from '@tanstack/react-query'

import {
  EAuthQueryKey,
  IChangeEmail,
  IChangePassword,
  ILogin,
  IRegister,
  IRevokeSessionQuery,
  IUpdateUser,
} from '@/app/(client)/entities/models'
import { ICallbackResult } from '@/app/(client)/shared/interfaces'
import { getQueryClient } from '@/pkg/libraries/rest-api'
import { loggerUtil } from '@/pkg/utils/logger'

import {
  changeEmail,
  changePassword,
  credentialsLogin,
  credentialsRegister,
  logout,
  revokeAllSessions,
  revokeOtherSessions,
  revokeSession,
  updateUser,
} from './auth.api'

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

export const updateUserMutationOptions = () => {
  return mutationOptions({
    mutationFn: (data: IUpdateUser) => updateUser(data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [EAuthQueryKey.AUTH_SESSIONS] })
    },

    onError: (error) => {
      loggerUtil({ text: 'UpdateUserMutationOptions', value: error.message, level: 'error' })
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

export const authChangeEmailMutationOptions = () => {
  return mutationOptions({
    mutationFn: (data: IChangeEmail) => changeEmail(data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [EAuthQueryKey.AUTH_SESSIONS] })
    },

    onError: (error) => {
      loggerUtil({ text: 'ChangeEmailMutationOptions', value: error.message, level: 'error' })
    },
  })
}

export const authChangePasswordMutationOptions = () => {
  return mutationOptions({
    mutationFn: (data: IChangePassword) => changePassword(data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [EAuthQueryKey.AUTH_SESSIONS] })
    },

    onError: (error) => {
      loggerUtil({ text: 'ChangePasswordMutationOptions', value: error.message, level: 'error' })
    },
  })
}
