'use client'
import { SessionQueryParams } from 'better-auth'
import { EllipsisIcon } from 'lucide-react'
import { FC } from 'react'
import { toast } from 'sonner'

import { useMutation } from '@tanstack/react-query'

import {
  banUserMutationOptions,
  impersonateUserMutationOptions,
  unbanUserMutationOptions,
} from '@/app/(client)/entities/api'
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/app/(client)/shared/ui'
import { useRouter } from '@/pkg/libraries/locale'
import { AuthUtil } from '@/pkg/utils/auth'

interface IProps {
  userId: string
  targetRole: string
  currentRole: string
  refetch?: (queryParams?: { query?: SessionQueryParams }) => void
  isImpersonating?: boolean
}

const UserActionsComponent: FC<Readonly<IProps>> = (props) => {
  const { userId, currentRole, targetRole, refetch, isImpersonating } = props

  const { mutateAsync: banUser } = useMutation(banUserMutationOptions())
  const { mutateAsync: unbanUser } = useMutation(unbanUserMutationOptions())
  const { mutateAsync: impersonateUser } = useMutation(impersonateUserMutationOptions())

  const canPerformAction = AuthUtil.canPerformActionByRole(currentRole, targetRole)

  const router = useRouter()

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

  const handleImpersonateUser = async () => {
    await impersonateUser({
      userId: userId,

      successCallback: () => {
        toast.success('User impersonated successfully')

        router.push('/')

        refetch?.()
      },

      errorCallback: (error) => {
        toast.error(error.error.message || 'Failed to impersonate user')
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

        <DropdownMenuItem disabled={!canPerformAction.success || isImpersonating} onClick={handleImpersonateUser}>
          Impersonate user
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserActionsComponent
