'use client'
import { EllipsisIcon } from 'lucide-react'
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
import { AuthUtil } from '@/pkg/utils/auth'

interface IProps {
  userId: string
  targetRole: string
  currentRole: string
}

const UserActionsComponent: FC<Readonly<IProps>> = (props) => {
  const { userId, currentRole, targetRole } = props
  const { mutateAsync: banUser } = useMutation(banUserMutationOptions())
  const { mutateAsync: unbanUser } = useMutation(unbanUserMutationOptions())

  const canPerformAction = AuthUtil.canPerformActionByRole(currentRole, targetRole)

  const handleBanUser = async () => {
    await banUser({
      userId: userId,
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
      userId: userId,

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
        <Button variant='outline'>
          <EllipsisIcon className='size-4' />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align='end'>
        <DropdownMenuLabel>User Actions</DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem disabled={!canPerformAction.success} onClick={handleBanUser}>
          Ban user
        </DropdownMenuItem>

        <DropdownMenuItem disabled={!canPerformAction.success} onClick={handleUnbanUser}>
          Unban user
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserActionsComponent
