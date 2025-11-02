import { mutationOptions } from '@tanstack/react-query'

import {
  EAdminQueryKey,
  IBannUserQuery,
  IImpersonateUserQuery,
  IRevokeSessionQuery,
  ISetRoleQuery,
  IUnbanUserQuery,
} from '@/app/(client)/entities/models'
import { ICallbackResult } from '@/app/(client)/shared/interfaces'
import { getQueryClient } from '@/pkg/libraries/rest-api'
import { loggerUtil } from '@/pkg/utils/logger'

import { banUser, impersonateUser, revokeSession, setRole, stopImpersonating, unbanUser } from './admin.api'

const queryClient = getQueryClient()

export const banUserMutationOptions = () => {
  return mutationOptions({
    mutationFn: (data: IBannUserQuery) => banUser(data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [EAdminQueryKey.ADMIN_USERS] })
    },

    onError: (error) => {
      loggerUtil({ text: 'BanUserMutationOptions', value: error.message, level: 'error' })
    },
  })
}

export const unbanUserMutationOptions = () => {
  return mutationOptions({
    mutationFn: (data: IUnbanUserQuery) => unbanUser(data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [EAdminQueryKey.ADMIN_USERS] })
    },

    onError: (error) => {
      loggerUtil({ text: 'UnbanUserMutationOptions', value: error.message, level: 'error' })
    },
  })
}

export const setRoleMutationOptions = () => {
  return mutationOptions({
    mutationFn: (data: ISetRoleQuery) => setRole(data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [EAdminQueryKey.ADMIN_USERS] })
    },

    onError: (error) => {
      loggerUtil({ text: 'SetRoleMutationOptions', value: error.message, level: 'error' })
    },
  })
}

export const revokeSessionMutationOptions = () => {
  return mutationOptions({
    mutationFn: (data: IRevokeSessionQuery) => revokeSession(data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [EAdminQueryKey.ADMIN_USERS] })
    },

    onError: (error) => {
      loggerUtil({ text: 'RevokeSessionMutationOptions', value: error.message, level: 'error' })
    },
  })
}

export const impersonateUserMutationOptions = () => {
  return mutationOptions({
    mutationFn: (data: IImpersonateUserQuery) => impersonateUser(data),

    onError: (error) => {
      loggerUtil({ text: 'ImpersonateUserMutationOptions', value: error.message, level: 'error' })
    },
  })
}

export const stopImpersonatingMutationOptions = () => {
  return mutationOptions({
    mutationFn: (data: ICallbackResult) => stopImpersonating(data),

    onError: (error) => {
      loggerUtil({ text: 'StopImpersonatingMutationOptions', value: error.message, level: 'error' })
    },
  })
}
