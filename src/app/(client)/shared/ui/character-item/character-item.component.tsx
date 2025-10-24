import { ICharacter } from '@/app/(client)/entities/models'

import type { FC } from 'react'
import { Button, Card, CardContent, CardFooter, CardHeader } from '@/app/(client)/shared/ui'
import Image from 'next/image'
import { Link } from '@/pkg/libraries/locale'
import { ArrowRightIcon } from 'lucide-react'

interface IProps {
  character: ICharacter
}

const CharacterItemComponent: FC<Readonly<IProps>> = (props) => {
  const { character } = props

  return (
    <Card>
      <CardHeader>
        <div className='relative mb-2 h-56 w-full'>
          <Image
            src={character.image}
            alt={character.name}
            fill
            className='rounded-lg object-cover'
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          />
        </div>

        <div className='flex items-center gap-2'>
          <h4 className='text-large line-clamp-2 font-bold'>{character.name}</h4>
        </div>
      </CardHeader>

      <CardContent>
        <div className='space-y-2 text-sm'>
          <div className='flex items-center gap-2'>
            <span>Status: </span>

            <span className='font-medium'>{character.status}</span>
          </div>

          <div className='flex items-center gap-2'>
            <span>Species: </span>

            <span className='font-medium'>{character.species}</span>
          </div>

          <div className='flex items-center gap-2'>
            <span>Gender: </span>

            <span className='font-medium'>{character.gender}</span>
          </div>

          <div className='flex items-center gap-2'>
            <span>Origin: </span>

            <span className='line-clamp-1 font-medium'>{character.origin.name}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className='flex'>
        <Link href={`/characters/${character.id}`}>
          <Button variant='ghost' className='text-primary'>
            <span className='text-sm underline'>View Details</span> <ArrowRightIcon />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

export default CharacterItemComponent
