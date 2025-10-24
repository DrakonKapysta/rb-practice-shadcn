import { setRequestLocale } from 'next-intl/server'
import { FC } from 'react'

import { LoginFormComponent } from '@/app/(client)/features/login-form'
import { ContainerComponent } from '@/app/(client)/shared/ui'
import { cacheLife } from 'next/cache'

interface IProps extends PageProps<'/[locale]/login'> {}

const Page: FC<Readonly<IProps>> = async (props) => {
  'use cache'
  cacheLife('default')

  const { locale } = await props.params

  setRequestLocale(locale)

  return (
    <ContainerComponent variant='section' className='flex-1 items-center justify-center'>
      <LoginFormComponent />
    </ContainerComponent>
  )
}
export default Page
