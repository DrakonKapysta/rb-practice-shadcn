import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { FC, ReactNode } from 'react'
import { getLangDir } from 'rtl-detect'

import { LayoutModule } from '@/app/(client)/modules/layout'
import { mainFont } from '@/config/fonts'
import { routing } from '@/pkg/libraries/locale'
import { RestApiProvider } from '@/pkg/libraries/rest-api'
import { UiProvider } from '@/pkg/libraries/ui'

import '@/config/styles/global.css'

interface IProps extends LayoutProps<'/[locale]'> {
  children: ReactNode
}

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export const generateMetadata = async (props: IProps): Promise<Metadata> => {
  const { params } = props
  const locale = (await params).locale
  const siteUrl = process.env.NEXT_PUBLIC_CLIENT_WEB_URL || 'https://example.com'
  const alternateLocales = routing.locales.filter((loc) => loc !== locale)

  return {
    title: {
      default: 'Character Database',
      template: '%s | Character Database',
    },
    description:
      'Explore and discover characters with detailed information, search functionality, and interactive comments',
    keywords: ['characters', 'database', 'search', 'wiki', 'information', 'interactive'],
    authors: [{ name: 'Character Database' }],
    creator: 'Character Database',
    publisher: 'Character Database',
    metadataBase: new URL(siteUrl),
    openGraph: {
      type: 'website',
      locale,
      alternateLocale: alternateLocales,
      url: `${siteUrl}/${locale}`,
      siteName: 'Character Database',
      title: 'Character Database',
      description:
        'Explore and discover characters with detailed information, search functionality, and interactive comments',
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
      title: 'Character Database',
      description:
        'Explore and discover characters with detailed information, search functionality, and interactive comments',
      images: [`${siteUrl}/images/og-image.jpg`],
    },
    alternates: {
      canonical: `${siteUrl}/${locale}`,
      languages: Object.fromEntries(routing.locales.map((loc) => [loc, `${siteUrl}/${loc}`])),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

const RootLayout: FC<Readonly<IProps>> = async (props) => {
  const { children, params } = props

  const locale = (await params).locale
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)

  const languageDirection = getLangDir(locale)

  return (
    <html lang={locale} dir={languageDirection} suppressHydrationWarning>
      <body className={`${mainFont.className} antialiased`} suppressHydrationWarning>
        <NextIntlClientProvider>
          <UiProvider>
            <RestApiProvider>
              <LayoutModule>{children}</LayoutModule>
            </RestApiProvider>
          </UiProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

export default RootLayout
