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
import { authClient } from '@/pkg/integrations/better-auth/auth-client'
import { EllipsisIcon } from 'lucide-react'

interface IProps {
  user: UserWithRole
}

const UserActionsComponent: FC<Readonly<IProps>> = (props) => {
  const { user } = props
  const { mutateAsync: banUser } = useMutation(banUserMutationOptions())
  const { mutateAsync: unbanUser } = useMutation(unbanUserMutationOptions())

  const session = authClient.useSession()

  const isCurrentUserAdmin = session.data?.user?.role === 'admin'
  const isSelf = session.data?.user?.id === user.id

  const handleBanUser = async () => {
    if (isSelf) {
      toast.error('You cannot perform this action on yourself')
      return
    }

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
    if (isSelf) {
      toast.error('You cannot unban yourself')
      return
    }

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
        <Button variant='outline'>
          <EllipsisIcon className='size-4' />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align='end'>
        <DropdownMenuLabel>User Actions</DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem disabled={isSelf} onClick={handleBanUser}>
          Ban user
        </DropdownMenuItem>

        <DropdownMenuItem disabled={isSelf} onClick={handleUnbanUser}>
          Unban user
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserActionsComponent
