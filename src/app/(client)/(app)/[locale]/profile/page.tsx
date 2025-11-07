import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { FC } from 'react'

import { ProfileModule } from '@/app/(client)/modules/profile'
import { ContainerComponent } from '@/app/(client)/shared/ui'
import { routing } from '@/pkg/libraries/locale'

interface IProps extends PageProps<'/[locale]/profile'> {}

export const generateMetadata = async (props: IProps): Promise<Metadata> => {
  const { locale } = await props.params
  const siteUrl = process.env.NEXT_PUBLIC_CLIENT_WEB_URL || 'https://example.com'
  const alternateLocales = routing.locales.filter((loc) => loc !== locale)
  const url = `${siteUrl}/${locale}/profile`

  return {
    title: 'Profile',
    description: 'Manage your account settings, personal information, active sessions, and change your password.',
    keywords: ['profile', 'account', 'settings', 'personal information'],
    robots: {
      index: false,
      follow: false,
    },
    openGraph: {
      type: 'profile',
      locale,
      alternateLocale: alternateLocales,
      url,
      siteName: 'Character Database',
      title: 'Profile | Character Database',
      description: 'Manage your account settings, personal information, active sessions, and change your password.',
    },
    twitter: {
      card: 'summary',
      title: 'Profile | Character Database',
      description: 'Manage your account settings, personal information, active sessions, and change your password.',
    },
    alternates: {
      canonical: url,
      languages: Object.fromEntries(routing.locales.map((loc) => [loc, `${siteUrl}/${loc}/profile`])),
    },
  }
}

const Page: FC<Readonly<IProps>> = async (props) => {
  const { locale } = await props.params

  setRequestLocale(locale)

  return (
    <ContainerComponent variant='main' className='max-w-7xl flex-1'>
      <ProfileModule />
    </ContainerComponent>
  )
}

export default Page
