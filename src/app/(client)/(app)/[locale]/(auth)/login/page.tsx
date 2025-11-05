import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { FC } from 'react'

import { LoginFormComponent } from '@/app/(client)/features/login-form'
import { ContainerComponent } from '@/app/(client)/shared/ui'
import { routing } from '@/pkg/libraries/locale'

interface IProps extends PageProps<'/[locale]/login'> {}

export const generateMetadata = async (props: IProps): Promise<Metadata> => {
  const { locale } = await props.params
  const siteUrl = process.env.NEXT_PUBLIC_CLIENT_WEB_URL || 'https://example.com'
  const alternateLocales = routing.locales.filter((loc) => loc !== locale)
  const url = `${siteUrl}/${locale}/login`

  return {
    title: 'Login',
    description:
      'Login to your account to access character database features, leave comments, and manage your profile.',
    keywords: ['login', 'authentication', 'account', 'sign in'],
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
      title: 'Login | Character Database',
      description:
        'Login to your account to access character database features, leave comments, and manage your profile.',
    },
    twitter: {
      card: 'summary',
      title: 'Login | Character Database',
      description:
        'Login to your account to access character database features, leave comments, and manage your profile.',
    },
    alternates: {
      canonical: url,
      languages: Object.fromEntries(routing.locales.map((loc) => [loc, `${siteUrl}/${loc}/login`])),
    },
  }
}

const Page: FC<Readonly<IProps>> = async (props) => {
  'use cache'

  const { locale } = await props.params

  setRequestLocale(locale)

  return (
    <ContainerComponent variant='section' className='flex-1 items-center justify-center'>
      <LoginFormComponent />
    </ContainerComponent>
  )
}
export default Page
