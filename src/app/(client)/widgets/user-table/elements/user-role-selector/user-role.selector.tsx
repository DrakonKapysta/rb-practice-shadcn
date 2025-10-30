'use client'

import { FC } from 'react'
import { toast } from 'sonner'

import { useMutation } from '@tanstack/react-query'

import { setRoleMutationOptions } from '@/app/(client)/entities/api'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/app/(client)/shared/ui'
import { authClient } from '@/pkg/integrations/better-auth/auth-client'

interface IProps {
  defaultValue: string
  userId: string
}

const UserRoleSelector: FC<Readonly<IProps>> = (props) => {
  const { defaultValue, userId } = props

  const { mutateAsync: setRole } = useMutation(setRoleMutationOptions())

  const session = authClient.useSession()

  const handleChange = async (value: 'admin' | 'user') => {
    if (session.data?.user?.role === 'admin' && session.data?.user?.id === userId) {
      toast.error('You cannot change your own role')
      return
    }

    await setRole({
      userId,
      role: value,

      successCallback: () => {
        toast.success('User role updated successfully')
      },
      errorCallback: (error) => {
        toast.error(error.error.message || 'Failed to update user role')
      },
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
