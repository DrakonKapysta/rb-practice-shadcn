import { Info, Mail, Shield } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { FC, Suspense } from 'react'

import { AccountEmailChangeFormComponent } from '@/app/(client)/features/account-email-change-form'
import { UserSessionWrapperComponent } from '@/app/(client)/features/user-session-wrapper'
import { Card, ReminderComponent, Separator, Spinner } from '@/app/(client)/shared/ui'

import { EmailChangeProcessComponent, EmailFeaturePointComponent } from './elements'

interface IProps {}

const AccountEmailChangeComponent: FC<Readonly<IProps>> = () => {
  const t = useTranslations('profile.accountEmailChange')

  return (
    <div className='mx-auto w-full max-w-5xl p-6'>
      <Card className='bg-card w-full border p-8'>
        <div className='border-b pb-6'>
          <div className='flex items-center gap-3'>
            <div className='bg-primary/10 flex h-12 w-12 items-center justify-center rounded-lg'>
              <Mail className='text-primary h-6 w-6' />
            </div>

            <div>
              <h2 className='text-2xl font-semibold tracking-tight'>{t('title')}</h2>

              <p className='text-muted-foreground mt-1 text-sm'>{t('description')}</p>
            </div>
          </div>
        </div>

        <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
          <div>
            <Suspense fallback={<Spinner className='mx-auto h-10 w-10 flex-1 items-center' />}>
              <UserSessionWrapperComponent>
                {(session) => <AccountEmailChangeFormComponent session={session} />}
              </UserSessionWrapperComponent>
            </Suspense>
          </div>

          <div className='space-y-6'>
            <div>
              <h3 className='mb-4 flex items-center gap-2 font-semibold'>
                <Shield className='text-muted-foreground h-5 w-5' />
                {t('importantInformation.title')}
              </h3>

              <p className='text-muted-foreground mb-6 text-sm'>{t('importantInformation.description')}</p>

              <div className='space-y-4'>
                <EmailFeaturePointComponent
                  title={t('importantInformation.emailVerification.title')}
                  description={t('importantInformation.emailVerification.description')}
                  icon={<Mail className='text-primary h-4 w-4' />}
                />

                <EmailFeaturePointComponent
                  title={t('importantInformation.accountSecurity.title')}
                  description={t('importantInformation.accountSecurity.description')}
                  icon={<Shield className='text-primary h-4 w-4' />}
                />

                <EmailFeaturePointComponent
                  title={t('importantInformation.accessToAccount.title')}
                  description={t('importantInformation.accessToAccount.description')}
                  icon={<Info className='text-primary h-4 w-4' />}
                />
              </div>
            </div>

            <Separator />

            <div className='bg-muted/50 rounded-lg border p-4'>
              <h4 className='mb-3 text-sm font-medium'>{t('emailChangeProcess.title')}</h4>

              <EmailChangeProcessComponent />
            </div>

            <ReminderComponent
              type='info'
              title={t('securityReminder.title')}
              description={t('securityReminder.description')}
            />
          </div>
        </div>
      </Card>
    </div>
  )
}

export default AccountEmailChangeComponent
