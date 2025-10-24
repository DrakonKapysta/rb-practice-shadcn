import { type FC, Suspense } from 'react'

import { CharacterListComponent } from '@/app/(client)/features/character-list'
import { ContainerComponent, Spinner } from '@/app/(client)/shared/ui'
import { CharacterSearchComponent } from '@/app/(client)/widgets/character-search'

interface IProps {}

const HomeModule: FC<Readonly<IProps>> = () => {
  return (
    <ContainerComponent className='mt-5 flex max-w-7xl flex-1 flex-col' variant='section'>
      <Suspense fallback={<Spinner />}>
        <CharacterSearchComponent />
      </Suspense>

      <Suspense fallback={<Spinner />}>
        <CharacterListComponent />
      </Suspense>
    </ContainerComponent>
  )
}

export default HomeModule
