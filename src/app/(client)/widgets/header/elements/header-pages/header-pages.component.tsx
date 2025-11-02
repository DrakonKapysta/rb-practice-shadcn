'use client'

import { ComponentPropsWithoutRef, FC } from 'react'

import { Button } from '@/app/(client)/shared/ui'
import { authClient } from '@/pkg/integrations/better-auth/auth-client'
import { Link } from '@/pkg/libraries/locale'
import { AuthUtil } from '@/pkg/utils/auth'
import { cn } from '@/pkg/utils/ui'

interface IProps extends ComponentPropsWithoutRef<'div'> {}

const HeaderPagesComponent: FC<Readonly<IProps>> = (props) => {
  const { className, ...rest } = props

  const { data: session } = authClient.useSession()

  return (
    <div className={cn('flex items-center gap-2', className)} {...rest}>
      {session && AuthUtil.hasAccessToAdminPanel(session.user?.role) && (
        <Link href='/admin-dashboard'>
          <Button variant='outline'>Users Table</Button>
        </Link>
      )}
    </div>
  )
}

export default HeaderPagesComponent
