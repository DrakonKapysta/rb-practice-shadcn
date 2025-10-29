import { setRequestLocale } from 'next-intl/server'
import { FC } from 'react'

import { dehydrate, HydrationBoundary } from '@tanstack/react-query'

import { adminUsersQueryOptions } from '@/app/(client)/entities/api'
import { AdminModule } from '@/app/(client)/modules/admin'
import { getQueryClient } from '@/pkg/libraries/rest-api'

interface IProps extends PageProps<'/[locale]/admin-dashboard'> {}

const Page: FC<Readonly<IProps>> = async (props) => {
  'use cache'

  const { locale } = await props.params

  setRequestLocale(locale)

  const queryClient = getQueryClient()

  await queryClient.prefetchQuery(
    adminUsersQueryOptions({
      limit: 10,
      offset: 0,
      sortBy: 'createdAt',
    }),
  )

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AdminModule />
    </HydrationBoundary>
  )
}

export default Page
