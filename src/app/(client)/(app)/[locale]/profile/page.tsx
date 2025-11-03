import { setRequestLocale } from 'next-intl/server'
import { FC } from 'react'

import { AccountBasicInfoComponent } from '@/app/(client)/features/account-basic-info'
import { AccountSessionsComponent } from '@/app/(client)/features/account-sessions'
import { ContainerComponent, Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/(client)/shared/ui'

interface IProps extends PageProps<'/[locale]/profile'> {}

const Page: FC<Readonly<IProps>> = async (props) => {
  const { locale } = await props.params

  setRequestLocale(locale)

  return (
    <ContainerComponent variant='section' className='max-w-7xl'>
      <Tabs defaultValue='basic-info'>
        <TabsList className='bg-primary-foreground mx-auto'>
          <TabsTrigger value='basic-info'>Basic Info</TabsTrigger>

          <TabsTrigger value='security'>Devices</TabsTrigger>
        </TabsList>

        <TabsContent value='basic-info'>
          <AccountBasicInfoComponent />
        </TabsContent>

        <TabsContent value='security'>
          <AccountSessionsComponent />
        </TabsContent>
      </Tabs>
    </ContainerComponent>
  )
}

export default Page
