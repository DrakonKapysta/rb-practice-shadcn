import { CogIcon } from 'lucide-react'
import { FC, Suspense } from 'react'

import { UserSessionWrapperComponent } from '@/app/(client)/features/user-session-wrapper'
import { Skeleton } from '@/app/(client)/shared/ui'
import { ProfileDropdownComponent } from '@/app/(client)/widgets/header/elements'
import { Link } from '@/pkg/libraries/locale'

interface IProps {}

const HeaderComponent: FC<Readonly<IProps>> = async () => {
  return (
    <nav className='desktop:px-6 bg-background/65 fixed z-10 flex h-16 w-full items-center gap-x-4 border-t px-4 shadow-md backdrop-blur-sm'>
      <div className='flex-1'>
        <Link href='/' className='inline-block px-4 py-2'>
          <CogIcon size={48} />
        </Link>
      </div>
      <Suspense fallback={<Skeleton className='h-10 w-40' />}>
        <UserSessionWrapperComponent>
          {(data) => <ProfileDropdownComponent session={data} />}
        </UserSessionWrapperComponent>
      </Suspense>
    </nav>
  )
}

export default HeaderComponent
