import Image from 'next/image'
import { forwardRef } from 'react'

import { Button } from '@/app/(client)/shared/ui'

interface IProps {
  name: string
  email: string
  avatar?: string | null
}

const ProfileTriggerButtonComponent = forwardRef<HTMLButtonElement, Readonly<IProps>>((props, ref) => {
  const { name, email, avatar, ...rest } = props

  return (
    <Button variant='outline' className='flex justify-between gap-x-4 px-2' size='lg' ref={ref} {...rest}>
      <div className='flex-1 text-left'>
        <div className='text-sm leading-tight font-medium tracking-tight text-zinc-900 dark:text-zinc-100'>{name}</div>

        <div className='text-xs leading-tight tracking-tight text-zinc-500 dark:text-zinc-400'>{email}</div>
      </div>

      {avatar && (
        <div className='relative'>
          <div className='h-6 w-6 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 p-0.5'>
            <div className='h-full w-full overflow-hidden rounded-full bg-white dark:bg-zinc-900'>
              <Image
                src={avatar}
                alt={name}
                width={36}
                height={36}
                className='h-full w-full rounded-full object-cover'
              />
            </div>
          </div>
        </div>
      )}
    </Button>
  )
})

ProfileTriggerButtonComponent.displayName = 'ProfileTriggerButtonComponent'

export default ProfileTriggerButtonComponent
