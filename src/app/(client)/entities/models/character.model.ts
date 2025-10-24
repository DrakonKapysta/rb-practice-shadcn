export enum ECharacterQueryKey {
  CHARACTERS = 'characters',
  CHARACTER_ID = 'character-id',
}

export interface ICharacter {
  id: number
  name: string
  status: 'Alive' | 'Dead' | 'unknown'
  species: string
  type: string
  gender: 'Female' | 'Male' | 'Genderless' | 'unknown'
  origin: {
    name: string
    url: string
  }
  location: {
    name: string
    url: string
  }
  image: string
  episode: string[]
  url: string
  created: string
  error?: string
}

export interface ICharactersResponse {
  info: {
    count: number
    pages: number
    next: string | null
    prev: string | null
  }
  results: ICharacter[]
}

export interface ICharacterFilters {
  name?: string
  status?: 'Alive' | 'Dead' | 'unknown' | ''
  species?: string
  type?: string
  gender?: 'Female' | 'Male' | 'Genderless' | 'unknown' | ''
  page?: number
}
