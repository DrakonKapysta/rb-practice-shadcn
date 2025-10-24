'use client'

import { FC } from 'react'

import { ICharacter } from '@/app/(client)/entities/models'
import { Card, CardContent, CardHeader } from '@/app/(client)/shared/ui'
import { getCharacterStatusColorUtil } from '@/pkg/utils/ui'

interface IProps {
  character: ICharacter
}

const BasicInformationComponent: FC<Readonly<IProps>> = (props) => {
  const { character } = props

  return (
    <Card className='text-secondary-500'>
      <CardHeader>
        <h3 className='text-xl font-semibold'>Basic Information</h3>
      </CardHeader>
      <CardContent className='space-y-3'>
        <div className='flex justify-between'>
          <span className='text-default-500'>Status:</span>
          <span className={`font-medium ${getCharacterStatusColorUtil(character.status)}`}>{character.status}</span>
        </div>
        <div className='flex justify-between'>
          <span className='text-default-500'>Species:</span>
          <span className='font-medium'>{character.species}</span>
        </div>
        <div className='flex justify-between'>
          <span className='text-default-500'>Type:</span>
          <span className='font-medium'>{character.type || 'Unknown'}</span>
        </div>
        <div className='flex justify-between'>
          <span className='text-default-500'>Gender:</span>
          <span className='font-medium'>{character.gender}</span>
        </div>
      </CardContent>
    </Card>
  )
}

export default BasicInformationComponent
