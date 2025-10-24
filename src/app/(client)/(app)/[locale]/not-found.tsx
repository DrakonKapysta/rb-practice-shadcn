import type { NextPage } from 'next'

import { ContainerComponent } from '@/client/shared/ui/container'
import { NotFoundComponent } from '@/client/shared/ui/not-found'

const NotFound: NextPage = () => {
  return (
    <ContainerComponent className='grid h-full items-center justify-center'>
      <NotFoundComponent />
    </ContainerComponent>
  )
}

export default NotFound
