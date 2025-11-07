import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { FC, Suspense } from 'react'

import { ContainerComponent, Spinner } from '@/app/(client)/shared/ui'
import { ForgotPasswordComponent } from '@/app/(client)/widgets/forgot-password'
import { routing } from '@/pkg/libraries/locale'

interface IProps extends PageProps<'/[locale]/forgot-password'> {}

export const generateMetadata = async (props: IProps): Promise<Metadata> => {
  const { locale } = await props.params
  const siteUrl = process.env.NEXT_PUBLIC_CLIENT_WEB_URL || 'https://example.com'
  const url = `${siteUrl}/${locale}/forgot-password`

  return {
    title: 'Forgot Password',
    description: 'Enter your email below to reset your password',
    keywords: ['forgot', 'password', 'reset', 'email', 'account'],
    authors: [{ name: 'Character Database' }],

    creator: 'Character Database',
    publisher: 'Character Database',

    metadataBase: new URL(siteUrl),

    openGraph: {
      type: 'website',
      locale,
      title: 'Forgot Password',
      description: 'Enter your email below to reset your password',
      url,
      siteName: 'Character Database',
      images: [{ url: `${siteUrl}/images/og-image.jpg` }],
    },

    alternates: {
      canonical: url,
      languages: Object.fromEntries(routing.locales.map((loc) => [loc, `${siteUrl}/${loc}/forgot-password`])),
    },
  }
}

const Page: FC<IProps> = async (props) => {
  const { locale } = await props.params

  setRequestLocale(locale)

  return (
    <ContainerComponent variant='section' className='mx-auto flex max-w-7xl flex-col items-center'>
      <Suspense fallback={<Spinner className='mx-auto h-16 w-16 flex-1 items-center' />}>
        <ForgotPasswordComponent searchParams={props.searchParams} />
      </Suspense>
    </ContainerComponent>
  )
}

export default Page
