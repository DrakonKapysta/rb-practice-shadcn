import { mutationOptions } from '@tanstack/react-query'

import { EAdminQueryKey, IBannUserQuery, ISetRoleQuery, IUnbanUserQuery } from '@/app/(client)/entities/models'
import { getQueryClient } from '@/pkg/libraries/rest-api'
import { loggerUtil } from '@/pkg/utils/logger'

import { banUser, setRole, unbanUser } from './admin.api'

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
