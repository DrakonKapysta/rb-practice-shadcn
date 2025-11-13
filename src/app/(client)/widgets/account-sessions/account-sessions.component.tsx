import { ShieldCheck } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { FC, Suspense } from 'react'

import { AccountSessionInfoComponent } from '@/app/(client)/features/account-session-info'
import { UserSessionWrapperComponent } from '@/app/(client)/features/user-session-wrapper'
import { Spinner } from '@/app/(client)/shared/ui'
import { Card } from '@/app/(client)/shared/ui/card'

interface IProps {}

const AccountSessionsComponent: FC<Readonly<IProps>> = () => {
  const t = useTranslations('profile.accountSessions')

  return (
    <div className='mx-auto max-w-5xl p-6'>
      <Card className='bg-card border p-8'>
        <div className='border-b pb-6'>
          <div className='flex flex-col items-center gap-3 sm:flex-row'>
            <div className='bg-primary/10 flex h-12 w-12 items-center justify-center rounded-lg'>
              <ShieldCheck className='text-primary h-6 w-6' />
            </div>

            <div>
              <h2 className='text-2xl font-semibold tracking-tight'>{t('activeSessions')}</h2>

              <p className='text-muted-foreground mt-1 text-sm'>{t('activeSessionsDescription')}</p>
            </div>
          </div>
        </div>

        <Suspense fallback={<Spinner className='mx-auto h-10 w-10 flex-1 items-center' />}>
          <UserSessionWrapperComponent>
            {(data) => <AccountSessionInfoComponent session={data?.session ?? null} />}
          </UserSessionWrapperComponent>
        </Suspense>

        <div className='bg-muted/50 mt-6 rounded-lg border p-4'>
          <div className='flex flex-col items-start gap-3 sm:flex-row'>
            <ShieldCheck className='mt-0.5 h-5 w-5 shrink-0 text-blue-500' />

            <div>
              <h4 className='mb-1 text-sm font-medium'>{t('securityTip')}</h4>

              <p className='text-muted-foreground text-sm'>{t('securityTipDescription')}</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default AccountSessionsComponent
