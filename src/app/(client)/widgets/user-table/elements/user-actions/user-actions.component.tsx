'use client'
import { UserWithRole } from 'better-auth/plugins'
import { FC } from 'react'

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
import { useRouter } from '@/pkg/libraries/locale'

interface IProps {
  user: UserWithRole
}

const UserActionsComponent: FC<Readonly<IProps>> = (props) => {
  const { user } = props

  const router = useRouter()

  const handleBanUser = async () => {
    await authClient.admin.banUser({
      userId: user.id,
      banReason: 'Banned by admin',
      banExpiresIn: 1000 * 60 * 60 * 24 * 30,
    })
    router.refresh()
  }

  const handleUnbanUser = async () => {
    await authClient.admin.unbanUser({
      userId: user.id,
    })
    router.refresh()
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
