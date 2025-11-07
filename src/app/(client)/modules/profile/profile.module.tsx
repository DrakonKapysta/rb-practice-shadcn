import { useTranslations } from 'next-intl'
import { FC } from 'react'

import { ScrollArea, ScrollBar, Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/(client)/shared/ui'
import { AccountBasicInfoComponent } from '@/app/(client)/widgets/account-basic-info'
import { AccountChangePasswordComponent } from '@/app/(client)/widgets/account-change-password'
import { AccountEmailChangeComponent } from '@/app/(client)/widgets/account-email-change'
import { AccountSessionsComponent } from '@/app/(client)/widgets/account-sessions'

interface IProps {}

const ProfileModule: FC<Readonly<IProps>> = () => {
  const t = useTranslations('profile')

  return (
    <Tabs defaultValue='basic-info' className='overflow-hidden'>
      <ScrollArea className='xs:max-w-none mx-auto w-full max-w-xs rounded-md px-2 pb-2 text-center'>
        <TabsList className='bg-primary-foreground mx-auto'>
          <TabsTrigger value='basic-info'>{t('tabs.basicInfo')}</TabsTrigger>

          <TabsTrigger value='security'>{t('tabs.devices')}</TabsTrigger>

          <TabsTrigger value='change-password'>{t('tabs.changePassword')}</TabsTrigger>

          <TabsTrigger value='email'>{t('tabs.email')}</TabsTrigger>
        </TabsList>
        <ScrollBar className='px-2' orientation='horizontal' />
      </ScrollArea>

      <TabsContent value='basic-info' className='flex flex-1'>
        <AccountBasicInfoComponent />
      </TabsContent>

      <TabsContent value='security' className='flex flex-1'>
        <AccountSessionsComponent />
      </TabsContent>

      <TabsContent value='change-password' className='flex flex-1'>
        <AccountChangePasswordComponent />
      </TabsContent>

      <TabsContent value='email' className='flex flex-1'>
        <AccountEmailChangeComponent />
      </TabsContent>
    </Tabs>
  )
}

export default ProfileModule
