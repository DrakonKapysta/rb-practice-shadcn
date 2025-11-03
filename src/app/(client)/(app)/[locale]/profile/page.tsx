import { setRequestLocale } from 'next-intl/server'
import { FC } from 'react'

import { AccountBasicInfoComponent } from '@/app/(client)/features/account-basic-info'

interface IProps extends PageProps<'/[locale]/profile'> {}

const Page: FC<Readonly<IProps>> = async (props) => {
  const { locale } = await props.params

  setRequestLocale(locale)

  return <AccountBasicInfoComponent />
}

export default Page
