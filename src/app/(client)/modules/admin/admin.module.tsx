import { FC, Suspense } from 'react'

import { ContainerComponent, Spinner } from '@/app/(client)/shared/ui'
import { UserTable } from '@/app/(client)/widgets/user-table'

interface IProps {}

const AdminModule: FC<Readonly<IProps>> = () => {
  return (
    <ContainerComponent variant='section' className='mt-5 max-w-7xl'>
      <Suspense fallback={<Spinner className='mx-auto h-10 w-10 flex-1 items-center' />}>
        <UserTable />
      </Suspense>
    </ContainerComponent>
  )
}

export default AdminModule
