'use client'
import { UserWithRole } from 'better-auth/plugins'
import { FC } from 'react'
import { toast } from 'sonner'

import { useMutation } from '@tanstack/react-query'

import { banUserMutationOptions, unbanUserMutationOptions } from '@/app/(client)/entities/api'
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/app/(client)/shared/ui'

interface IProps {
  user: UserWithRole
}

const UserActionsComponent: FC<Readonly<IProps>> = (props) => {
  const { user } = props
  const { mutateAsync: banUser } = useMutation(banUserMutationOptions())
  const { mutateAsync: unbanUser } = useMutation(unbanUserMutationOptions())

  const handleBanUser = async () => {
    await banUser({
      userId: user.id,
      banReason: 'Banned by admin',
      banExpiresIn: 1000 * 60 * 60 * 24 * 30,

      successCallback: () => {
        toast.success('User banned successfully')
      },
      errorCallback: (error) => {
        toast.error(error.error.message || 'Failed to fetch users')
      },
    })
  }

  const handleUnbanUser = async () => {
    await unbanUser({
      userId: user.id,

      successCallback: () => {
        toast.success('User unbanned successfully')
      },
      errorCallback: (error) => {
        toast.error(error.error.message || 'Failed to fetch users')
      },
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline'>Open menu</Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align='end'>
        <DropdownMenuLabel>User Actions</DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={handleBanUser}>Ban user</DropdownMenuItem>

        <DropdownMenuItem onClick={handleUnbanUser}>Unban user</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserActionsComponent
