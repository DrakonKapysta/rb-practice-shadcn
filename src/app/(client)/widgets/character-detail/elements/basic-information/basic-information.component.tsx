'use client'

import { useTranslations } from 'next-intl'
import { FC } from 'react'

import { ICharacter } from '@/app/(client)/entities/models'
import { Card, CardContent, CardHeader } from '@/app/(client)/shared/ui'
import { getCharacterStatusColorUtil } from '@/pkg/utils/ui'

interface IProps {
  character: ICharacter
}

const BasicInformationComponent: FC<Readonly<IProps>> = (props) => {
  const { character } = props
  const t = useTranslations('characterDetail.basicInformation')

  return (
    <Card className='text-secondary-500'>
      <CardHeader>
        <h3 className='text-xl font-semibold'>{t('title')}</h3>
      </CardHeader>

      <CardContent className='space-y-3'>
        <div className='flex justify-between'>
          <span className='text-default-500'>{t('status')}:</span>
          <span className={`font-medium ${getCharacterStatusColorUtil(character.status)}`}>{character.status}</span>
        </div>

        <div className='flex justify-between'>
          <span className='text-default-500'>{t('species')}:</span>
          <span className='font-medium'>{character.species}</span>
        </div>

        <div className='flex justify-between'>
          <span className='text-default-500'>{t('type')}:</span>
          <span className='font-medium'>{character.type || t('unknown')}</span>
        </div>

        <div className='flex justify-between'>
          <span className='text-default-500'>{t('gender')}:</span>
          <span className='font-medium'>{character.gender}</span>
        </div>
      </CardContent>
    </Card>
  )
}

export default BasicInformationComponent
