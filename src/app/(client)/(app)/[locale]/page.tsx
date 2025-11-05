import type { Metadata } from 'next'
import { cacheLife } from 'next/cache'
import { setRequestLocale } from 'next-intl/server'
import { FC } from 'react'

import { dehydrate, HydrationBoundary } from '@tanstack/react-query'

import { charactersQueryOptions } from '@/app/(client)/entities/api'
import { HomeModule } from '@/app/(client)/modules/home'
import { routing } from '@/pkg/libraries/locale'
import { getQueryClient } from '@/pkg/libraries/rest-api'

interface IProps extends PageProps<'/[locale]'> {}

export const generateMetadata = async (props: IProps): Promise<Metadata> => {
  const { locale } = await props.params
  const siteUrl = process.env.NEXT_PUBLIC_CLIENT_WEB_URL || 'https://example.com'
  const alternateLocales = routing.locales.filter((loc) => loc !== locale)

  return {
    title: 'Home',
    description:
      'Browse and search through a comprehensive character database. Find detailed information, status, species, and interact with comments.',
    keywords: ['characters', 'database', 'search', 'browse', 'wiki', 'information'],
    openGraph: {
      type: 'website',
      locale,
      alternateLocale: alternateLocales,
      url: `${siteUrl}/${locale}`,
      siteName: 'Character Database',
      title: 'Home | Character Database',
      description:
        'Browse and search through a comprehensive character database. Find detailed information, status, species, and interact with comments.',
      images: [
        {
          url: `${siteUrl}/images/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: 'Character Database',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Home | Character Database',
      description:
        'Browse and search through a comprehensive character database. Find detailed information, status, species, and interact with comments.',
      images: [`${siteUrl}/images/og-image.jpg`],
    },
    alternates: {
      canonical: `${siteUrl}/${locale}`,
      languages: Object.fromEntries(routing.locales.map((loc) => [loc, `${siteUrl}/${loc}`])),
    },
  }
}

const Page: FC<Readonly<IProps>> = async (props) => {
  'use cache'
  cacheLife('default')

  const { locale } = await props.params

  setRequestLocale(locale)

  const queryClient = getQueryClient()

  await queryClient.prefetchQuery(charactersQueryOptions({}))

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HomeModule />
    </HydrationBoundary>
  )
}
export default Page
