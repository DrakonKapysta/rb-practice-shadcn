import { type FC, Suspense } from 'react'

import { ContainerComponent, Spinner } from '@/app/(client)/shared/ui'
import { CharacterCommentComponent } from '@/app/(client)/widgets/character-comment'
import { CharacterDetailComponent } from '@/app/(client)/widgets/character-detail'

interface IProps {
  characterId: number
}

const CharacterModule: FC<Readonly<IProps>> = (props) => {
  const { characterId } = props

  return (
    <ContainerComponent className='mt-5 flex max-w-7xl flex-1 flex-col' variant='section'>
      <Suspense fallback={<Spinner />}>
        <CharacterDetailComponent characterId={characterId} />
      </Suspense>

      <CharacterCommentComponent characterId={characterId} />
    </ContainerComponent>
  )
}

export default CharacterModule
