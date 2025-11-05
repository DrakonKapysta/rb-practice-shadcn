import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { FC } from 'react'

import { RegisterFormComponent } from '@/app/(client)/features/register-form'
import { ContainerComponent } from '@/app/(client)/shared/ui'
import { routing } from '@/pkg/libraries/locale'

interface IProps extends PageProps<'/[locale]/register'> {}

export const generateMetadata = async (props: IProps): Promise<Metadata> => {
  const { locale } = await props.params
  const siteUrl = process.env.NEXT_PUBLIC_CLIENT_WEB_URL || 'https://example.com'
  const alternateLocales = routing.locales.filter((loc) => loc !== locale)
  const url = `${siteUrl}/${locale}/register`

  return {
    title: 'Register',
    description: 'Create a new account to explore characters, leave comments, and personalize your experience.',
    keywords: ['register', 'sign up', 'authentication', 'account', 'create account'],
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
      title: 'Register | Character Database',
      description: 'Create a new account to explore characters, leave comments, and personalize your experience.',
    },
    twitter: {
      card: 'summary',
      title: 'Register | Character Database',
      description: 'Create a new account to explore characters, leave comments, and personalize your experience.',
    },
    alternates: {
      canonical: url,
      languages: Object.fromEntries(routing.locales.map((loc) => [loc, `${siteUrl}/${loc}/register`])),
    },
  }
}

const Page: FC<Readonly<IProps>> = async (props) => {
  'use cache'

  const { locale } = await props.params

  setRequestLocale(locale)

  return (
    <ContainerComponent variant='section' className='flex-1 items-center justify-center'>
      <RegisterFormComponent />
    </ContainerComponent>
  )
}
export default Page
