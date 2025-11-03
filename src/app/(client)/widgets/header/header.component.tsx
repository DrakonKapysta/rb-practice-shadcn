import { CogIcon } from 'lucide-react'
import { FC } from 'react'

import { ProfileDropdownComponent } from '@/app/(client)/widgets/header/elements'
import { Link } from '@/pkg/libraries/locale'

interface IProps {}

const HeaderComponent: FC<Readonly<IProps>> = async () => {
  return (
    <nav className='desktop:px-6 bg-background/65 fixed z-10 flex h-16 w-full items-center gap-x-4 border-t px-4 shadow-md backdrop-blur-sm'>
      <div className='flex-1'>
        <Link href='/'>
          <CogIcon size={48} />
        </Link>
      </div>

      <ProfileDropdownComponent />
    </nav>
  )
}

export default HeaderComponent
