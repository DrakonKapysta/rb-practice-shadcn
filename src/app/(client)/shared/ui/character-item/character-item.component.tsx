import { ArrowRightIcon } from 'lucide-react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import type { FC } from 'react'

import { ICharacter } from '@/app/(client)/entities/models'
import { Button, Card, CardContent, CardFooter, CardHeader } from '@/app/(client)/shared/ui'
import { Link } from '@/pkg/libraries/locale'
import { cn, getCharacterStatusColorUtil } from '@/pkg/utils/ui'

interface IProps {
  character: ICharacter
}

const CharacterItemComponent: FC<Readonly<IProps>> = (props) => {
  const { character } = props
  const t = useTranslations('characterItem')

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
          <h4 className='text-large line-clamp-2 scroll-m-20 text-xl font-semibold tracking-tight'>{character.name}</h4>
        </div>
      </CardHeader>

      <CardContent>
        <div className='space-y-2 text-sm'>
          <div className='flex items-center gap-2'>
            <span>{t('status')}: </span>

            <span className={cn('font-medium', getCharacterStatusColorUtil(character.status))}>{character.status}</span>
          </div>

          <div className='flex items-center gap-2'>
            <span>{t('species')}: </span>

            <span className='font-medium'>{character.species}</span>
          </div>

          <div className='flex items-center gap-2'>
            <span>{t('gender')}: </span>

            <span className='font-medium'>{character.gender}</span>
          </div>

          <div className='flex items-center gap-2'>
            <span>{t('origin')}: </span>

            <span className='line-clamp-1 font-medium'>{character.origin.name}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className='flex'>
        <Link href={`/character/${character.id}`}>
          <Button variant='ghost' className='text-primary'>
            <span className='text-sm underline'>{t('viewDetails')}</span> <ArrowRightIcon />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

export default CharacterItemComponent
