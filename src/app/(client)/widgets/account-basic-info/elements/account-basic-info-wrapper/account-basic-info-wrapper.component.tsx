import { FC } from 'react'

import { getSession } from '@/app/(client)/entities/api'
import { AccountBasicInfoFormComponent } from '@/app/(client)/features/account-basic-info-form'

interface IProps {}

const AccountBasicInfoWrapperComponent: FC<Readonly<IProps>> = async () => {
  const data = await getSession()

  return <AccountBasicInfoFormComponent defaultValues={data?.user} />
}

export default AccountBasicInfoWrapperComponent
