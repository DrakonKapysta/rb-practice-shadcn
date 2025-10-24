import { CogIcon } from 'lucide-react'
import { FC, Suspense } from 'react'

import { Spinner } from '@/app/(client)/shared/ui'
import { Link } from '@/pkg/libraries/locale'

import { HeaderActionsComponent } from './elements/header-actions'

interface IProps {}

const HeaderComponent: FC<Readonly<IProps>> = async () => {
  return (
    <nav className='desktop:px-6 bg-background/65 fixed z-10 flex h-16 w-full items-center justify-between border-t px-4 shadow-md backdrop-blur-sm'>
      <div>
        <Link href='/'>
          <CogIcon size={48} />
        </Link>
      </div>

      <Suspense fallback={<Spinner />}>
        <HeaderActionsComponent />
      </Suspense>
    </nav>
  )
}

export default HeaderComponent
