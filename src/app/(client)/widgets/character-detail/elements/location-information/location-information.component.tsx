'use client'
import { useTranslations } from 'next-intl'
import { FC } from 'react'

import { ICharacter } from '@/app/(client)/entities/models'
import { Card, CardContent, CardHeader } from '@/app/(client)/shared/ui'

interface IProps {
  character: ICharacter
}

const LocationInformationComponent: FC<Readonly<IProps>> = (props) => {
  const { character } = props
  const t = useTranslations('characterDetail.locationInformation')

  return (
    <Card className='text-secondary-500'>
      <CardHeader>
        <h3 className='text-xl font-semibold'>{t('title')}</h3>
      </CardHeader>

      <CardContent className='space-y-3'>
        <div>
          <span className='text-default-500 block'>{t('origin')}:</span>
          <span className='font-medium'>{character.origin.name}</span>
        </div>

        <div>
          <span className='text-default-500 block'>{t('location')}:</span>
          <span className='font-medium'>{character.location.name}</span>
        </div>
      </CardContent>
    </Card>
  )
}

export default LocationInformationComponent
