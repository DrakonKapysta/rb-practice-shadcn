import { EAuthQueryKey } from '@/app/(client)/entities/models'

import { listSessionsOnServer } from './auth-server.api'

export const authServerSessionListQueryOptions = () => {
  return {
    queryKey: [EAuthQueryKey.AUTH_SESSIONS, 'server'],

    queryFn: () => listSessionsOnServer(),
  }
}
