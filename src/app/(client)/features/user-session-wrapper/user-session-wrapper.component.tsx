import { FC, ReactNode } from 'react'

import { getSession } from '@/app/(client)/entities/api'

interface IProps {
  children: (data: Awaited<ReturnType<typeof getSession>>) => ReactNode
}

const UserSessionWrapperComponent: FC<Readonly<IProps>> = async (props) => {
  const { children } = props

  const data = await getSession()

  return <>{children(data)}</>
}

export default UserSessionWrapperComponent
