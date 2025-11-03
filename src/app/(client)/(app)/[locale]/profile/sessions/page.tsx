import { setRequestLocale } from 'next-intl/server'
import { FC } from 'react'

import { AccountSessionsComponent } from '@/app/(client)/features/account-sessions'

interface IProps extends PageProps<'/[locale]/profile/sessions'> {}

const Page: FC<Readonly<IProps>> = async (props) => {
  const { locale } = await props.params

  setRequestLocale(locale)

  return <AccountSessionsComponent />
}

export default Page
