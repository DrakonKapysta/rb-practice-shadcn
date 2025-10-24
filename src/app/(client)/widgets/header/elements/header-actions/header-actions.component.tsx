'use client'
import { FC } from 'react'

import { Button, Spinner } from '@/app/(client)/shared/ui'
import { authClient } from '@/pkg/integrations/better-auth/auth-client'
import { Link, useRouter } from '@/pkg/libraries/locale'

interface IProps {}

const HeaderActionsComponent: FC<Readonly<IProps>> = () => {
  const { data: session, isPending } = authClient.useSession()

  const router = useRouter()

  const handleLogout = async () => {
    await authClient.signOut()

    router.push('/login')
  }

  if (isPending) {
    return <Spinner />
  }

  return (
    <div className='flex items-center gap-2'>
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
          <Button onClick={handleLogout} variant='outline'>
            Logout
          </Button>
        </>
      )}
    </div>
  )
}

export default HeaderActionsComponent
