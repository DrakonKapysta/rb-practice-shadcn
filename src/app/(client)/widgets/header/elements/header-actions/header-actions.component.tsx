'use client'
import { FC, useTransition } from 'react'

import { LanguageSwitcherComponent } from '@/app/(client)/features/language-switcher'
import { Button, Spinner } from '@/app/(client)/shared/ui'
import { authClient } from '@/pkg/integrations/better-auth/auth-client'
import { Link, useRouter } from '@/pkg/libraries/locale'

interface IProps {}

const HeaderActionsComponent: FC<Readonly<IProps>> = () => {
  const { data: session, isPending } = authClient.useSession()

  const [isSubmitting, startTransition] = useTransition()

  const router = useRouter()

  const handleLogout = () => {
    startTransition(async () => {
      await authClient.signOut()

      router.push('/login')
    })
  }

  const isLogoutProcessing = isPending || isSubmitting

  if (isLogoutProcessing) {
    return <Spinner />
  }

  return (
    <div className='flex items-center gap-2'>
      <LanguageSwitcherComponent />
      {!session ? (
        <>
          <Link href='/login'>
            <Button variant='outline'>Login</Button>
          </Link>

          <Link href='/register'>
            <Button variant='outline'>Register</Button>
          </Link>
        </>
      ) : (
        <>
          <Button disabled={isLogoutProcessing} onClick={handleLogout} variant='outline'>
            {isLogoutProcessing ? <Spinner /> : 'Logout'}
          </Button>
        </>
      )}
    </div>
  )
}

export default HeaderActionsComponent
