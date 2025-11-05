import type { Metadata } from 'next'

import { getTranslations, setRequestLocale } from 'next-intl/server'
import { FC } from 'react'

import { ContainerComponent, Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/(client)/shared/ui'
import { AccountBasicInfoComponent } from '@/app/(client)/widgets/account-basic-info'
import { AccountChangePasswordComponent } from '@/app/(client)/widgets/account-change-password'
import { AccountSessionsComponent } from '@/app/(client)/widgets/account-sessions'
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

  const t = await getTranslations('profile')

  return (
    <ContainerComponent variant='section' className='0 max-w-7xl flex-1'>
      <Tabs defaultValue='basic-info' className='flex flex-1 overflow-hidden'>
        <TabsList className='bg-primary-foreground mx-auto'>
          <TabsTrigger value='basic-info'>{t('tabs.basicInfo')}</TabsTrigger>

          <TabsTrigger value='security'>{t('tabs.devices')}</TabsTrigger>

          <TabsTrigger value='change-password'>{t('tabs.changePassword')}</TabsTrigger>
        </TabsList>

        <TabsContent value='basic-info' className='flex flex-1'>
          <AccountBasicInfoComponent />
        </TabsContent>

        <TabsContent value='security' className='flex flex-1'>
          <AccountSessionsComponent />
        </TabsContent>

        <TabsContent value='change-password' className='flex flex-1'>
          <AccountChangePasswordComponent />
        </TabsContent>
      </Tabs>
    </ContainerComponent>
  )
}

export default Page
