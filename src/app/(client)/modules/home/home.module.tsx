import type { FC } from 'react'
import { ContainerComponent } from '@/app/(client)/shared/ui'
import { CharacterListComponent } from '@/app/(client)/features/character-list'

interface IProps {}

const HomeModule: FC<Readonly<IProps>> = (props) => {
  return (
    <ContainerComponent className='max-w-7xl' variant='section'>
      <CharacterListComponent />
    </ContainerComponent>
  )
}

export default HomeModule
