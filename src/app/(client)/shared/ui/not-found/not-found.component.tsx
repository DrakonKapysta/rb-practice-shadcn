'use client'

import { CircleAlert } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { type FC } from 'react'

import { Button } from '@/app/(client)/shared/ui'
import { useRouter } from '@/pkg/libraries/locale'
import { cn } from '@/pkg/utils/ui'

interface IProps {
  title?: string
  description?: string
  buttonText?: string
  className?: string
}

const NotFoundComponent: FC<Readonly<IProps>> = (props) => {
  const { title, description, buttonText, className } = props

  const t = useTranslations('notFound')

  const router = useRouter()

  return (
    <div className={cn('flex flex-col items-center gap-4', className)}>
      <CircleAlert className='text-primary size-10' />

      <h1 className='text-2xl font-bold'>{title || t('title')}</h1>

      <p className='text-foreground/70 text-sm'>{description || t('description')}</p>

      <Button variant='default' className='w-fit' onClick={() => router.back()}>
        {buttonText || t('button')}
      </Button>
    </div>
  )
}

export default NotFoundComponent
