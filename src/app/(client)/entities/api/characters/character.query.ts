import { queryOptions } from '@tanstack/react-query'

import { ECharacterQueryKey, ICharacter, ICharacterFilters, ICharactersResponse } from '@/app/(client)/entities/models'

import { getCharacterById, getCharacters } from './character.api'

export const charactersQueryOptions = (filters?: ICharacterFilters) => {
  return queryOptions<ICharactersResponse>({
    queryKey: [ECharacterQueryKey.CHARACTERS, filters],
    queryFn: (params) => getCharacters(filters, params),
  })
}

export const characterByIdQueryOptions = (id: number) => {
  return queryOptions<ICharacter>({
    queryKey: [ECharacterQueryKey.CHARACTER_ID, id],
    queryFn: () => getCharacterById(id),
  })
}
