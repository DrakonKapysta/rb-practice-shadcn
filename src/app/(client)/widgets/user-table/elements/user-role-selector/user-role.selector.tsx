'use client'

import { FC } from 'react'
import { toast } from 'sonner'

import { useMutation } from '@tanstack/react-query'

import { setRoleMutationOptions } from '@/app/(client)/entities/api'
import { Role } from '@/app/(client)/entities/models'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/app/(client)/shared/ui'
import { AuthUtil } from '@/pkg/utils/auth'

interface IProps {
  role: string
  userId: string
  currentRole: string
}

const UserRoleSelector: FC<Readonly<IProps>> = (props) => {
  const { role, userId, currentRole } = props

  const { mutateAsync: setRole } = useMutation(setRoleMutationOptions())

  const hasPermission = AuthUtil.canPerformActionByRole(currentRole, role)

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
    <Select defaultValue={role} onValueChange={handleChange}>
      <SelectTrigger disabled={!hasPermission.success} className='w-[180px]'>
        <SelectValue placeholder='Select a role' />
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          <SelectItem disabled={!hasPermission.roles.includes(Role.SUPER_ADMIN)} value='super_admin'>
            Super Admin
          </SelectItem>

          <SelectItem disabled={!hasPermission.roles.includes(Role.ADMIN)} value='admin'>
            Admin
          </SelectItem>

          <SelectItem disabled={!hasPermission.roles.includes(Role.USER)} value='user'>
            User
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default UserRoleSelector
