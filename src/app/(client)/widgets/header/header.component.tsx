import { CogIcon } from 'lucide-react'

import { Button } from '@/app/(client)/shared/ui'
import { Link } from '@/pkg/libraries/locale'

const HeaderComponent = async () => {
  return (
    <nav className='tablet:px-4 desktop:px-6 bg-background/65 fixed z-10 flex h-16 w-full items-center justify-between border-t px-2 shadow-md backdrop-blur-sm'>
      <div>
        <Link href='/'>
          <CogIcon size={48} />
        </Link>
      </div>
      <div className='flex items-center gap-2'>
        <Link href='/login'>
          <Button variant='outline'>Login</Button>
        </Link>
        <Link href='/register'>
          <Button variant='outline'>Register</Button>
        </Link>
      </div>
    </nav>
  )
}

export default HeaderComponent
