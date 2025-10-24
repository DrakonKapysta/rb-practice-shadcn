'use client'

import type { FC } from 'react'
import { CharacterItemComponent } from '@/app/(client)/shared/ui'
import { useQuery } from '@tanstack/react-query'
import { charactersQueryOptions } from '@/app/(client)/entities/api/characters/character.query'

interface IProps {}

const CharacterListComponent: FC<Readonly<IProps>> = () => {
  const { data: characters } = useQuery(charactersQueryOptions())
  return (
    <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
      {characters?.results.map((character) => (
        <CharacterItemComponent key={character.id} character={character} />
      ))}
    </div>
  )
}

export default CharacterListComponent
