import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { FC, Suspense } from 'react'

import { HomeModule } from '@/app/(client)/modules/home'
import { Spinner } from '@/app/(client)/shared/ui'
import { routing } from '@/pkg/libraries/locale'

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
  const { locale } = await props.params

  setRequestLocale(locale)

  return (
    <Suspense fallback={<Spinner className='mx-auto h-16 w-16 flex-1 items-center' />}>
      <HomeModule />
    </Suspense>
  )
}
export default Page
