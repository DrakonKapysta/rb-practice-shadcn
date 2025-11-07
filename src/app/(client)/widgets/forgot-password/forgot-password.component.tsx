import { FC } from 'react'
import { EmailFormComponent, PasswordResetFormComponent } from './elements'
import { getTranslations } from 'next-intl/server'
import { NotFoundComponent } from '@/app/(client)/shared/ui'

interface IProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

const ForgotPasswordComponent: FC<Readonly<IProps>> = async (props) => {
  const { searchParams } = props

  const t = await getTranslations('forgotPassword')

  const steps = [t('steps.item1'), t('steps.item2'), t('steps.item3')]
  const tips = [t('tips.item1'), t('tips.item2'), t('tips.item3')]

  const { token, error } = await searchParams

  if (error) {
    return (
      <NotFoundComponent
        title={'Invalid token'}
        description={'The token you are trying to use is invalid or has expired.'}
        buttonText={'Go back to the login page'}
        className={'h-screen'}
      />
    )
  } else {
    return token ? <PasswordResetFormComponent token={token} /> : <EmailFormComponent steps={steps} tips={tips} />
  }
}

export default ForgotPasswordComponent
