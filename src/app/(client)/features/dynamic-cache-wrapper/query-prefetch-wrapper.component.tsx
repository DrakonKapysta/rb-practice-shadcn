import { cacheLife } from 'next/cache'
import React from 'react'

import { dehydrate, FetchQueryOptions, HydrationBoundary } from '@tanstack/react-query'

import { getQueryClient } from '@/pkg/libraries/rest-api'

interface IProps<TData = unknown, TError = Error, TQueryKey extends readonly unknown[] = readonly unknown[]> {
  children: React.ReactNode
  queryOptions: FetchQueryOptions<TData, TError, TData, TQueryKey>
  profile?: 'default' | 'seconds' | 'minutes' | 'hours' | 'days' | 'weeks' | 'months' | 'years'
}

const QueryPrefetchWrapperComponent = async <
  TData = unknown,
  TError = Error,
  TQueryKey extends readonly unknown[] = readonly unknown[],
>(
  props: IProps<TData, TError, TQueryKey>,
) => {
  'use cache'
  cacheLife(props.profile ?? 'default')

  const queryClient = getQueryClient()

  await queryClient.prefetchQuery(props.queryOptions)

  return <HydrationBoundary state={dehydrate(queryClient)}>{props.children}</HydrationBoundary>
}

export default QueryPrefetchWrapperComponent
