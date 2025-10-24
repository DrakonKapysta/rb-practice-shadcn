'use client'

import { useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import * as qs from 'qs-esm'
import type { FC } from 'react'

import { useQuery } from '@tanstack/react-query'

import { charactersQueryOptions } from '@/app/(client)/entities/api/characters/character.query'
import { CharacterItemComponent, NotFoundComponent } from '@/app/(client)/shared/ui'
import { Spinner } from '@/app/(client)/shared/ui'

interface IProps {}

const CharacterListComponent: FC<Readonly<IProps>> = () => {
  const searchParams = useSearchParams()

  const t = useTranslations('characterList')

  const filters = qs.parse(searchParams.toString())

  const { data: characters, isLoading } = useQuery(charactersQueryOptions(filters))

  if (characters && characters.error) {
    return (
      <div className='flex flex-1 items-center justify-center'>
        <NotFoundComponent
          title={characters?.error || t('error')}
          description={t('errorDescription')}
          buttonText={t('goBack')}
        />
      </div>
    )
  }

  return (
    <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
      {isLoading ? (
        <div className='col-span-full flex h-[calc(100svh-10rem)] items-center justify-center'>
          <Spinner className='h-16 w-16' />
        </div>
      ) : (
        characters?.results.map((character) => <CharacterItemComponent key={character.id} character={character} />)
      )}
    </div>
  )
}

export default CharacterListComponent
