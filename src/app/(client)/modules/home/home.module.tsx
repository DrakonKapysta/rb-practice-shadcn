import { cacheLife, cacheTag } from 'next/cache'
import { type FC, Suspense } from 'react'

import { charactersQueryOptions } from '@/app/(client)/entities/api'
import { CharacterListComponent } from '@/app/(client)/features/character-list'
import { QueryPrefetchWrapperComponent } from '@/app/(client)/features/dynamic-cache-wrapper'
import { ContainerComponent, Skeleton, Spinner } from '@/app/(client)/shared/ui'
import { CharacterSearchComponent } from '@/app/(client)/widgets/character-search'

interface IProps {}

const HomeModule: FC<Readonly<IProps>> = async () => {
  'use cache: private'
  cacheLife({ stale: 60 })
  cacheTag('home')

  await new Promise((resolve) => setTimeout(resolve, 10000))

  return (
    <QueryPrefetchWrapperComponent queryOptions={charactersQueryOptions({})}>
      <ContainerComponent className='mt-5 flex max-w-7xl flex-1 flex-col' variant='section'>
        <Suspense fallback={<Skeleton className='bg-primary-foreground h-28 w-full' />}>
          <CharacterSearchComponent />
        </Suspense>

        <Suspense fallback={<Spinner className='mx-auto h-16 w-16 flex-1 items-center' />}>
          <CharacterListComponent />
        </Suspense>
      </ContainerComponent>
    </QueryPrefetchWrapperComponent>
  )
}

export default HomeModule
