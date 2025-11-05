import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { FC } from 'react'

import { dehydrate, HydrationBoundary } from '@tanstack/react-query'

import { adminUsersQueryOptions } from '@/app/(client)/entities/api'
import { AdminModule } from '@/app/(client)/modules/admin'
import { routing } from '@/pkg/libraries/locale'
import { getQueryClient } from '@/pkg/libraries/rest-api'

interface IProps extends PageProps<'/[locale]/admin-dashboard'> {}

export const generateMetadata = async (props: IProps): Promise<Metadata> => {
  const { locale } = await props.params
  const siteUrl = process.env.NEXT_PUBLIC_CLIENT_WEB_URL || 'https://example.com'
  const alternateLocales = routing.locales.filter((loc) => loc !== locale)
  const url = `${siteUrl}/${locale}/admin-dashboard`

  return {
    title: 'Admin Dashboard',
    description: 'Administrative dashboard for managing users and system settings.',
    keywords: ['admin', 'dashboard', 'management', 'users'],
    robots: {
      index: false,
      follow: false,
    },
    openGraph: {
      type: 'website',
      locale,
      alternateLocale: alternateLocales,
      url,
      siteName: 'Character Database',
      title: 'Admin Dashboard | Character Database',
      description: 'Administrative dashboard for managing users and system settings.',
    },
    twitter: {
      card: 'summary',
      title: 'Admin Dashboard | Character Database',
      description: 'Administrative dashboard for managing users and system settings.',
    },
    alternates: {
      canonical: url,
      languages: Object.fromEntries(routing.locales.map((loc) => [loc, `${siteUrl}/${loc}/admin-dashboard`])),
    },
  }
}

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
