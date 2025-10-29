'use client'

import { FC } from 'react'

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/app/(client)/shared/ui'
import { authClient } from '@/pkg/integrations/better-auth/auth-client'

interface IProps {
  defaultValue: string
  userId: string
}

const UserRoleSelector: FC<Readonly<IProps>> = (props) => {
  const { defaultValue, userId } = props

  const handleChange = async (value: 'admin' | 'user') => {
    await authClient.admin.setRole({
      userId,
      role: value,
    })
  }

  return (
    <Select defaultValue={defaultValue} onValueChange={handleChange}>
      <SelectTrigger className='w-[180px]'>
        <SelectValue placeholder='Select a role' />
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          <SelectItem value='admin'>Admin</SelectItem>

          <SelectItem value='user'>User</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default UserRoleSelector
