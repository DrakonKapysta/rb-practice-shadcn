import { FC } from 'react'

import { ICharacter } from '@/app/(client)/entities/models'
import { Button } from '@/app/(client)/shared/ui'
import { useRouter } from '@/pkg/libraries/locale'

interface IProps {
  character: ICharacter
  backToMessage: string
}

const CharacterHeaderComponent: FC<Readonly<IProps>> = (props) => {
  const { character, backToMessage } = props

  const router = useRouter()

  const handleBack = () => {
    router.back()
  }

  return (
    <div className='mb-6 flex items-center gap-4'>
      <Button
        variant='outline'
        onClick={handleBack}
        className='text-default-500 border-default-500 hover:bg-default-500/10 rounded-md border px-2 py-2 font-medium hover:underline'
      >
        {backToMessage}
      </Button>

      <h1 className='text-3xl font-bold'>{character.name}</h1>
    </div>
  )
}

export default CharacterHeaderComponent
