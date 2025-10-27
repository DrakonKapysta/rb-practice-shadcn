import { FC } from 'react'

import { CharacterCommentFieldComponent } from './elements/character-comment-field'
import { CharacterCommentFormComponent } from './elements/character-comment-form'

interface IProps {
  characterId: number
}
const CharacterCommentComponent: FC<Readonly<IProps>> = (props) => {
  const { characterId } = props

  return (
    <div className='space-y-4'>
      <CharacterCommentFormComponent characterId={characterId} />

      <CharacterCommentFieldComponent characterId={characterId} />
    </div>
  )
}

export default CharacterCommentComponent
