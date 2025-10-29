import { setRequestLocale } from 'next-intl/server'
import { FC } from 'react'

import { AdminModule } from '@/app/(client)/modules/admin'

interface IProps extends PageProps<'/[locale]/admin-dashboard'> {}

const Page: FC<Readonly<IProps>> = async (props) => {
  const { locale } = await props.params

  setRequestLocale(locale)

  return <AdminModule />
}

export default Page
