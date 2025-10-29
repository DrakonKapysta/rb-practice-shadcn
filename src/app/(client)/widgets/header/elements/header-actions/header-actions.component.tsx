'use client'

import { useTranslations } from 'next-intl'
import { FC, useTransition } from 'react'

import { LanguageSwitcherComponent } from '@/app/(client)/features/language-switcher'
import { Button } from '@/app/(client)/shared/ui'
import { authClient } from '@/pkg/integrations/better-auth/auth-client'
import { Link, useRouter } from '@/pkg/libraries/locale'

interface IProps {}

const HeaderActionsComponent: FC<Readonly<IProps>> = () => {
  const { data: session, isPending } = authClient.useSession()

  const [isSubmitting, startTransition] = useTransition()

  const tHeader = useTranslations('header')

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

      {session && session.user?.role === 'admin' && (
        <Link href='/admin-dashboard'>
          <Button variant='outline'>Admin</Button>
        </Link>
      )}

      {session && (
        <>
          <Button disabled={isLogoutProcessing} onClick={handleLogout} variant='outline'>
            {tHeader('logout')}
          </Button>
        </>
      )}
    </div>
  )
}

export default HeaderActionsComponent
