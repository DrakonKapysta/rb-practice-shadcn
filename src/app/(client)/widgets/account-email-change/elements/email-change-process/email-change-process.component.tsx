import { useTranslations } from 'next-intl'
import { FC } from 'react'

interface IProps {}

const EmailChangeProcessComponent: FC<Readonly<IProps>> = () => {
  const t = useTranslations('profile.accountEmailChange')

  return (
    <ol className='text-muted-foreground space-y-3 text-sm'>
      <li className='flex items-center gap-3'>
        <span className='bg-primary/10 text-primary mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-medium'>
          1
        </span>

        <span>{t('emailChangeProcess.steps.step1')}</span>
      </li>

      <li className='flex items-center gap-3'>
        <span className='bg-primary/10 text-primary mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-medium'>
          2
        </span>

        <span>{t('emailChangeProcess.steps.step2')}</span>
      </li>

      <li className='flex items-center gap-3'>
        <span className='bg-primary/10 text-primary mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-medium'>
          3
        </span>

        <span>{t('emailChangeProcess.steps.step3')}</span>
      </li>

      <li className='flex items-center gap-3'>
        <span className='bg-primary/10 text-primary mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-medium'>
          4
        </span>

        <span>{t('emailChangeProcess.steps.step4')}</span>
      </li>
    </ol>
  )
}

export default EmailChangeProcessComponent
