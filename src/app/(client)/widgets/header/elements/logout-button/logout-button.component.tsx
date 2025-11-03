import { LogOut } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { FC } from 'react'
import { toast } from 'sonner'

import { useMutation } from '@tanstack/react-query'

import { logoutMutationOptions, stopImpersonatingMutationOptions } from '@/app/(client)/entities/api'
import { Button } from '@/app/(client)/shared/ui'
import { authClient } from '@/pkg/integrations/better-auth/auth-client'
import { useRouter } from '@/pkg/libraries/locale'

interface IProps {
  onClose: () => void
}

const LogoutButtonComponent: FC<Readonly<IProps>> = (props) => {
  const { onClose } = props

  const { data: session, refetch } = authClient.useSession()

  const { mutateAsync: logout, isPending: isLoggingOut } = useMutation(logoutMutationOptions())
  const { mutateAsync: stopImpersonating, isPending: isStoppingImpersonating } = useMutation(
    stopImpersonatingMutationOptions(),
  )

  const router = useRouter()

  const tHeader = useTranslations('header')

  const handleLogout = async () => {
    await logout({
      successCallback: () => {
        router.push('/login')

        onClose()
      },
    })
  }

  const handleStopImpersonating = async () => {
    await stopImpersonating({
      successCallback: () => {
        toast.success('Impersonating stopped successfully')

        router.push('/')

        refetch()
      },

      errorCallback: (error) => {
        toast.error(error.error.message || 'Failed to stop impersonating')
      },
    })
  }

  const isProcessing = isLoggingOut || isStoppingImpersonating

  return (
    <Button
      size='sm'
      className='group flex w-full cursor-pointer items-center justify-start gap-3 rounded-xl border border-transparent bg-red-500/10 p-3 transition-all duration-200 hover:border-red-500/30 hover:bg-red-500/20 hover:shadow-sm'
      onClick={session && session.session?.impersonatedBy ? handleStopImpersonating : handleLogout}
      disabled={isProcessing}
    >
      <LogOut className='h-4 w-4 text-red-500 group-hover:text-red-600' />

      <span className='text-sm font-medium text-red-500 group-hover:text-red-600'>
        {session && session.session?.impersonatedBy ? tHeader('stopImpersonating') : tHeader('logout')}
      </span>
    </Button>
  )
}

export default LogoutButtonComponent
