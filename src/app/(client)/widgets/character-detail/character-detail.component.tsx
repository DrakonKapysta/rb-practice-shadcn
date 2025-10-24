'use client'

import { useTranslations } from 'next-intl'
import { FC } from 'react'

import { useQuery } from '@tanstack/react-query'

import { characterByIdQueryOptions } from '@/app/(client)/entities/api'
import { NotFoundComponent, Spinner } from '@/app/(client)/shared/ui'

import {
  BasicInformationComponent,
  CharacterHeaderComponent,
  CharacterImageComponent,
  EpisodesInformationComponent,
  LocationInformationComponent,
} from './elements'

interface IProps {
  characterId: number
}

const CharacterDetailComponent: FC<Readonly<IProps>> = (props) => {
  const { characterId } = props
  const t = useTranslations('characterDetail')

  const { data: character, isLoading } = useQuery(characterByIdQueryOptions(characterId))

  if (isLoading) {
    return <Spinner />
  }

  if (!character) {
    return <NotFoundComponent title={t('notFound')} />
  }

  return (
    <div className='mx-auto mt-8 w-full max-w-4xl space-y-6'>
      <CharacterHeaderComponent character={character} backToMessage={t('backToCharacters')} />

      <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
        <CharacterImageComponent character={character} />

        <div className='space-y-4'>
          <BasicInformationComponent character={character} />
          <LocationInformationComponent character={character} />
          <EpisodesInformationComponent character={character} />
        </div>
      </div>
    </div>
  )
}

export default CharacterDetailComponent
