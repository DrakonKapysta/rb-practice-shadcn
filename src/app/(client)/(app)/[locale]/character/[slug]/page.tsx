import { cacheLife } from 'next/cache'
import { FC, Suspense } from 'react'

import { dehydrate, HydrationBoundary } from '@tanstack/react-query'

import { characterByIdQueryOptions, getCharacters } from '@/app/(client)/entities/api'
import { Spinner } from '@/app/(client)/shared/ui'
import { CharacterDetailComponent } from '@/app/(client)/widgets/character-detail'
import { getQueryClient } from '@/pkg/libraries/rest-api'

interface IProps extends PageProps<'/[locale]/character/[slug]'> {}

export async function generateStaticParams() {
  const characters = await getCharacters()

  const res = characters.results.map((character) => ({
    slug: character.id.toString(),
  }))

  return res
}

const Page: FC<Readonly<IProps>> = async (props) => {
  'use cache'
  cacheLife('default')

  const characterId = parseInt((await props.params).slug)

  const queryClient = getQueryClient()

  await queryClient.prefetchQuery(characterByIdQueryOptions(characterId))

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<Spinner />}>
        <CharacterDetailComponent characterId={characterId} />
      </Suspense>
    </HydrationBoundary>
  )
}

export default Page
