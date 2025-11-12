import { Shield } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { FC } from 'react'

import { AccountChangePasswordFormComponent } from '@/app/(client)/features/account-change-password-form'
import { Card, ReminderComponent } from '@/app/(client)/shared/ui'
import { Link } from '@/pkg/libraries/locale'

interface IProps {}

const AccountChangePasswordComponent: FC<Readonly<IProps>> = () => {
  const t = useTranslations('profile.accountChangePassword')

  return (
    <div className='mx-auto max-w-5xl p-6'>
      <Card className='bg-card border p-8'>
        <div className='grid grid-cols-1 gap-6 border-b pb-6 md:grid-cols-2'>
          <div className='flex items-center gap-3'>
            <div className='bg-primary/10 flex h-12 w-12 items-center justify-center rounded-lg'>
              <Shield className='text-primary h-6 w-6' />
            </div>

            <div>
              <h2 className='text-2xl font-semibold tracking-tight'>{t('title')}</h2>

              <p className='text-muted-foreground mt-1 text-sm'>{t('description')}</p>
            </div>
          </div>
          <div>
            <ReminderComponent
              title='Login with Social Accounts'
              description='If you logged in with social accounts, you will not have a password. So you need to go through forgot password process to set a new password.'
            >
              <Link className='text-primary text-sm' href={'/forgot-password'}>
                Forgot Password
              </Link>
            </ReminderComponent>
          </div>
        </div>

        <AccountChangePasswordFormComponent />
      </Card>
    </div>
  )
}

export default AccountChangePasswordComponent
