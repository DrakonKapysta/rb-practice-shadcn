import { mutationOptions } from '@tanstack/react-query'

import { updateUserOnServer } from '@/app/(client)/entities/api'
import { IUpdateUser } from '@/app/(client)/entities/models'
import { loggerUtil } from '@/pkg/utils/logger'

export const updateUserOnServerMutationOptions = () => {
  return mutationOptions({
    mutationFn: (data: IUpdateUser) => updateUserOnServer(data),

    onError: (error) => {
      loggerUtil({ text: 'UpdateUserOnServerMutationOptions', value: error.message, level: 'error' })
    },
  })
}
