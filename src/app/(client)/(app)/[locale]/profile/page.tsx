import { setRequestLocale } from 'next-intl/server'
import { FC } from 'react'

import { ContainerComponent, Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/(client)/shared/ui'
import { AccountBasicInfoComponent } from '@/app/(client)/widgets/account-basic-info'
import { AccountSessionsComponent } from '@/app/(client)/widgets/account-sessions'
import { AccountChangePasswordComponent } from '@/app/(client)/widgets/account-change-password'

interface IProps extends PageProps<'/[locale]/profile'> {}

const Page: FC<Readonly<IProps>> = async (props) => {
  const { locale } = await props.params

  setRequestLocale(locale)

  return (
    <ContainerComponent variant='section' className='0 max-w-7xl flex-1'>
      <Tabs defaultValue='basic-info' className='flex flex-1 overflow-hidden'>
        <TabsList className='bg-primary-foreground mx-auto'>
          <TabsTrigger value='basic-info'>Basic Info</TabsTrigger>

          <TabsTrigger value='security'>Devices</TabsTrigger>

          <TabsTrigger value='change-password'>Change Password</TabsTrigger>
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
