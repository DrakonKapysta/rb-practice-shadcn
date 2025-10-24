import type { FC, ReactNode } from 'react'

import { ContainerComponent } from '@/app/(client)/shared/ui'
import { HeaderComponent } from '@/app/(client)/widgets/header'
import { FooterComponent } from '@/app/(client)/widgets/footer'

interface IProps {
  children: ReactNode
}

const LayoutModule: FC<IProps> = async (props) => {
  const { children } = props

  return (
    <>
      <HeaderComponent />
      <ContainerComponent className='bg-secondary relative pt-18' variant='main'>
        {children}
      </ContainerComponent>
      <FooterComponent />
    </>
  )
}

export default LayoutModule
