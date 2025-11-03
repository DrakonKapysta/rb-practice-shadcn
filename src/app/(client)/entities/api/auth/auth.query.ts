import { queryOptions } from '@tanstack/react-query'

import { EAuthQueryKey } from '@/app/(client)/entities/models'

import { listSessions } from './auth.api'

export const authSessionListQueryOptions = () => {
  return queryOptions({
    queryKey: [EAuthQueryKey.AUTH_SESSIONS],

    queryFn: () => listSessions(),
  })
}
