'use client'

import { useTranslations } from 'next-intl'
import { FC, useTransition } from 'react'
import { toast } from 'sonner'

import { useMutation } from '@tanstack/react-query'

import { logoutMutationOptions, stopImpersonatingMutationOptions } from '@/app/(client)/entities/api'
import { LanguageSwitcherComponent } from '@/app/(client)/features/language-switcher'
import { Button } from '@/app/(client)/shared/ui'
import { authClient } from '@/pkg/integrations/better-auth/auth-client'
import { Link, useRouter } from '@/pkg/libraries/locale'
import { AuthUtil } from '@/pkg/utils/auth'

interface IProps {}

const HeaderActionsComponent: FC<Readonly<IProps>> = () => {
  const { data: session, isPending, refetch } = authClient.useSession()

  const { mutateAsync: stopImpersonating } = useMutation(stopImpersonatingMutationOptions())
  const { mutateAsync: logout } = useMutation(logoutMutationOptions())

  const [isSubmitting, startTransition] = useTransition()

  const tHeader = useTranslations('header')

  const router = useRouter()

  const handleLogout = async () => {
    await logout({
      successCallback: () => {
        startTransition(async () => {
          router.push('/login')
        })
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

  const isLogoutProcessing = isPending || isSubmitting

  return (
    <div className='flex items-center gap-2'>
      <LanguageSwitcherComponent />

      {session && AuthUtil.hasAccessToAdminPanel(session.user?.role) && (
        <Link href='/admin-dashboard'>
          <Button variant='outline'>Admin</Button>
        </Link>
      )}

      {session && session.session?.impersonatedBy ? (
        <Button disabled={isLogoutProcessing} onClick={handleStopImpersonating} variant='outline'>
          {tHeader('stopImpersonating')}
        </Button>
      ) : (
        <Button disabled={isLogoutProcessing} onClick={handleLogout} variant='outline'>
          {tHeader('logout')}
        </Button>
      )}
    </div>
  )
}

export default HeaderActionsComponent
