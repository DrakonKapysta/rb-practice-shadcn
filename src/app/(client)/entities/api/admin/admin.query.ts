import { queryOptions } from '@tanstack/react-query'

import { EAdminQueryKey, IAdminUsersQuery } from '@/app/(client)/entities/models'

import { getUsers } from './admin.api'

export const adminUsersQueryOptions = (query: IAdminUsersQuery) => {
  return queryOptions({
    queryKey: [EAdminQueryKey.ADMIN_USERS, query.offset, query.limit, query.sortBy],

    queryFn: () => getUsers(query),
  })
}
