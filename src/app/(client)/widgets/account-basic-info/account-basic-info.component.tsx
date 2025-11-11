import { cacheLife, cacheTag } from 'next/cache'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import React, { FC } from 'react'

import { Card } from '@/app/(client)/shared/ui'

interface IProps {
  children?: React.ReactNode
  locale: string
}

const AccountBasicInfoComponent: FC<Readonly<IProps>> = async (props) => {
  'use cache'
  cacheLife('days')
  cacheTag('account-basic-info')

  const { children, locale } = props

  setRequestLocale(locale)

  const t = await getTranslations('profile.accountBasicInfo')

  return (
    <div className='mx-auto max-w-5xl p-6'>
      <Card className='bg-card border p-8'>
        <div className='border-b pb-6'>
          <h2 className='text-2xl font-semibold tracking-tight'>{t('title')}</h2>

          <p className='text-muted-foreground mt-2 text-sm'>{t('description')}</p>
        </div>

        {children}
      </Card>
    </div>
  )
}

export default AccountBasicInfoComponent
