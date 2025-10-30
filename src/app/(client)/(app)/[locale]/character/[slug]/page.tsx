'use cache'

import { setRequestLocale } from 'next-intl/server'
import { FC } from 'react'

import { dehydrate, HydrationBoundary } from '@tanstack/react-query'

import { characterByIdQueryOptions, getCharacters } from '@/app/(client)/entities/api'
import { CharacterModule } from '@/app/(client)/modules/character'
import { getQueryClient } from '@/pkg/libraries/rest-api'
import { cacheLife } from 'next/cache'

interface IProps extends PageProps<'/[locale]/character/[slug]'> {}

export async function generateStaticParams() {
  const characters = await getCharacters()

  const res = characters.results.map((character) => ({
    slug: character.id.toString(),
  }))

  return res
}

const Page: FC<Readonly<IProps>> = async (props) => {
  cacheLife('minutes')

  const { locale } = await props.params

  setRequestLocale(locale)

  const characterId = parseInt((await props.params).slug)

  const queryClient = getQueryClient()

  await queryClient.prefetchQuery(characterByIdQueryOptions(characterId))

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CharacterModule characterId={characterId} />
    </HydrationBoundary>
  )
}

export default Page
