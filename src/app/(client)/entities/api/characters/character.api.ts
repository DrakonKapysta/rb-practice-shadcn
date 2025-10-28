'use server'

import * as qs from 'qs-esm'

import { QueryFunctionContext } from '@tanstack/react-query'

import { ICharacter, ICharacterFilters, ICharactersResponse } from '@/app/(client)/entities/models'
import { restApiFetcher } from '@/pkg/libraries/rest-api'
import { loggerUtil } from '@/pkg/utils/logger'

export async function getCharacters(
  filters?: ICharacterFilters,
  options?: QueryFunctionContext,
): Promise<ICharactersResponse> {
  'use cache'

  const queryString = filters ? qs.stringify(filters) : ''

  const url = queryString ? `character?${queryString}` : 'character'

  const signal = options?.signal
  const fetchOpts = signal instanceof AbortSignal ? { signal } : undefined

  try {
    const data = await restApiFetcher.get(url, fetchOpts).json<ICharactersResponse>()

    return data
  } catch (error) {
    loggerUtil({ text: 'Error fetching characters', value: error })

    throw error
  }
}
export async function getCharacterById(id: number, options?: QueryFunctionContext): Promise<ICharacter> {
  'use cache'

  const signal = options?.signal
  const fetchOpts = signal instanceof AbortSignal ? { signal } : undefined

  try {
    const data = await restApiFetcher.get(`character/${id}`, fetchOpts).json<ICharacter>()

    return data
  } catch (error) {
    loggerUtil({ text: 'Error fetching character by id', value: error })

    throw error
  }
}
