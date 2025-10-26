'use client'

import { FC, useTransition } from 'react'

import { LanguageSwitcherComponent } from '@/app/(client)/features/language-switcher'
import { Button } from '@/app/(client)/shared/ui'
import { authClient } from '@/pkg/integrations/better-auth/auth-client'
import { useRouter } from '@/pkg/libraries/locale'

interface IProps {}

const HeaderActionsComponent: FC<Readonly<IProps>> = () => {
  const { data: session, isPending } = authClient.useSession()

  const [isSubmitting, startTransition] = useTransition()

  const router = useRouter()

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          startTransition(async () => {
            router.push('/login')
          })
        },
      },
    })
  }

  const isLogoutProcessing = isPending || isSubmitting

  return (
    <div className='flex items-center gap-2'>
      <LanguageSwitcherComponent />

      {session && (
        <>
          <Button disabled={isLogoutProcessing} onClick={handleLogout} variant='outline'>
            Logout
          </Button>
        </>
      )}
    </div>
  )
}

export default HeaderActionsComponent
