import { setRequestLocale } from 'next-intl/server'
import { FC } from 'react'

import { dehydrate, HydrationBoundary } from '@tanstack/react-query'

import { getQueryClient } from '@/pkg/libraries/rest-api'
import { cacheLife } from 'next/cache'

interface IProps extends PageProps<'/[locale]'> {}

const Page: FC<Readonly<IProps>> = async (props) => {
  'use cache'
  cacheLife('default')

  const { locale } = await props.params

  setRequestLocale(locale)

  const queryClient = getQueryClient()

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div>Locale page: {locale}</div>
    </HydrationBoundary>
  )
}
export default Page
