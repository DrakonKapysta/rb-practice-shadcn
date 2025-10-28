import { type FC, Suspense } from 'react'

import { CharacterListComponent } from '@/app/(client)/features/character-list'
import { ContainerComponent, Skeleton, Spinner } from '@/app/(client)/shared/ui'
import { CharacterSearchComponent } from '@/app/(client)/widgets/character-search'

interface IProps {}

const HomeModule: FC<Readonly<IProps>> = () => {
  return (
    <ContainerComponent className='mt-5 flex max-w-7xl flex-1 flex-col' variant='section'>
      <Suspense fallback={<Skeleton className='bg-primary-foreground h-28 w-full' />}>
        <CharacterSearchComponent />
      </Suspense>

      <Suspense fallback={<Spinner className='mx-auto h-16 w-16 flex-1 items-center' />}>
        <CharacterListComponent />
      </Suspense>
    </ContainerComponent>
  )
}

export default HomeModule
