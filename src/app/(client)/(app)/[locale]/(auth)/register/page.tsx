import { setRequestLocale } from 'next-intl/server'
import { FC } from 'react'

import { RegisterFormComponent } from '@/app/(client)/features/register-form'
import { ContainerComponent } from '@/app/(client)/shared/ui'

interface IProps extends PageProps<'/[locale]/register'> {}

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
