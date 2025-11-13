import { mutationOptions } from '@tanstack/react-query'

import {
  changeEmailOnServer,
  changePasswordOnServer,
  revokeAllSessionsOnServer,
  revokeOtherSessionsOnServer,
  revokeSessionOnServer,
  updateUserOnServer,
} from '@/app/(client)/entities/api'
import { IChangePassword, IUpdateUser } from '@/app/(client)/entities/models'
import { loggerUtil } from '@/pkg/utils/logger'

export const updateUserOnServerMutationOptions = () => {
  return mutationOptions({
    mutationFn: (data: IUpdateUser) => updateUserOnServer(data),

    onError: (error) => {
      loggerUtil({ text: 'UpdateUserOnServerMutationOptions', value: error.message, level: 'error' })
    },
  })
}

export const changeEmailOnServerMutationOptions = () => {
  return mutationOptions({
    mutationFn: (newEmail: string) => changeEmailOnServer(newEmail),

    onError: (error) => {
      loggerUtil({ text: 'ChangeEmailOnServerMutationOptions', value: error.message, level: 'error' })
    },
  })
}

export const changePasswordOnServerMutationOptions = () => {
  return mutationOptions({
    mutationFn: (data: IChangePassword) => changePasswordOnServer(data),

    onError: (error) => {
      loggerUtil({ text: 'ChangePasswordOnServerMutationOptions', value: error.message, level: 'error' })
    },
  })
}

export const revokeSessionOnServerMutationOptions = () => {
  return mutationOptions({
    mutationFn: (sessionToken: string) => revokeSessionOnServer(sessionToken),

    onError: (error) => {
      loggerUtil({ text: 'RevokeSessionOnServerMutationOptions', value: error.message, level: 'error' })
    },
  })
}

export const revokeAllSessionsOnServerMutationOptions = () => {
  return mutationOptions({
    mutationFn: () => revokeAllSessionsOnServer(),

    onError: (error) => {
      loggerUtil({ text: 'RevokeAllSessionsOnServerMutationOptions', value: error.message, level: 'error' })
    },
  })
}

export const revokeOtherSessionsOnServerMutationOptions = () => {
  return mutationOptions({
    mutationFn: () => revokeOtherSessionsOnServer(),

    onError: (error) => {
      loggerUtil({ text: 'RevokeOtherSessionsOnServerMutationOptions', value: error.message, level: 'error' })
    },
  })
}
