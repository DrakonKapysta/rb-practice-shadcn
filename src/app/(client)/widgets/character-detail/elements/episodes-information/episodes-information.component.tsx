'use client'
import { useTranslations } from 'next-intl'
import { FC } from 'react'

import { ICharacter } from '@/app/(client)/entities/models'
import { Card, CardContent, CardHeader } from '@/app/(client)/shared/ui'

interface IProps {
  character: ICharacter
}

const EpisodesInformationComponent: FC<Readonly<IProps>> = (props) => {
  const { character } = props
  const t = useTranslations('characterDetail.episodesInformation')

  return (
    <Card className='text-secondary-500'>
      <CardHeader>
        <h3 className='text-xl font-semibold'>{t('title')}</h3>
      </CardHeader>
      <CardContent>
        <p className='text-default-500'>
          {t('episodeCount')}: {character.episode.length}
        </p>
      </CardContent>
    </Card>
  )
}

export default EpisodesInformationComponent
