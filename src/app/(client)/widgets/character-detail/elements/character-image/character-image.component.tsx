import Image from 'next/image'
import { FC } from 'react'

import { ICharacter } from '@/app/(client)/entities/models'
import { Card, CardHeader } from '@/app/(client)/shared/ui'

interface IProps {
  character: ICharacter
}

const CharacterImageComponent: FC<Readonly<IProps>> = (props) => {
  const { character } = props

  return (
    <Card>
      <CardHeader className='flex-col items-start px-4 pt-2 pb-0'>
        <div className='relative h-96 w-full'>
          <Image
            src={character.image}
            alt={character.name}
            fill
            className='rounded-lg object-cover'
            sizes='(max-width: 768px) 100vw, 50vw'
            priority
          />
        </div>
      </CardHeader>
    </Card>
  )
}

export default CharacterImageComponent
