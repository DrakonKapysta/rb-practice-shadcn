import { FC } from 'react'

import { ICharacter } from '@/app/(client)/entities/models'
import { Link } from '@/pkg/libraries/locale'

interface IProps {
  character: ICharacter
  backToMessage: string
}

const CharacterHeaderComponent: FC<Readonly<IProps>> = (props) => {
  const { character, backToMessage } = props

  return (
    <div className='mb-6 flex items-center gap-4'>
      <Link
        href='/'
        className='text-default-500 border-default-500 hover:bg-default-500/10 rounded-md border px-2 py-2 font-medium hover:underline'
      >
        {backToMessage}
      </Link>

      <h1 className='text-3xl font-bold'>{character.name}</h1>
    </div>
  )
}

export default CharacterHeaderComponent
