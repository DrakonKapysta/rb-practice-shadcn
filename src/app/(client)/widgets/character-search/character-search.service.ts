import { ICharacterSearch } from './character-search.interface'

export class CharacterSearchService {
  static getDefaultFilters: () => ICharacterSearch = () => {
    return {
      name: '',
      status: '',
      species: '',
      gender: '',
    }
  }
  static hasFilters = (filters: ICharacterSearch) => {
    return Object.values(filters).some((value) => value)
  }
  static transformFilters = (filters: ICharacterSearch) => {
    return Object.entries(filters)
      .filter(([_, value]) => value && value.trim() !== '')
      .map(([name, value]) => ({ name, value: value as string }))
  }
}
