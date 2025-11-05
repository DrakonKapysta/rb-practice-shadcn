'use client'

import { Eye, EyeOff } from 'lucide-react'
import { ComponentPropsWithRef, FC, useState } from 'react'

import { Button, Input } from '@/app/(client)/shared/ui'

interface IProps extends ComponentPropsWithRef<typeof Input> {
  id: string
  canShowPassword?: boolean
}

const PasswordField: FC<Readonly<IProps>> = (props) => {
  const { id, ref, canShowPassword = true, ...rest } = props
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className='relative'>
      <Input ref={ref} {...rest} id={id} type={showPassword ? 'text' : 'password'} placeholder='••••••••' />

      {canShowPassword && (
        <Button
          type='button'
          variant='ghost'
          size='sm'
          className='absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent'
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <EyeOff className='h-4 w-4' aria-hidden='true' />
          ) : (
            <Eye className='h-4 w-4' aria-hidden='true' />
          )}

          <span className='sr-only'>{showPassword ? 'Hide password' : 'Show password'}</span>
        </Button>
      )}
    </div>
  )
}

export default PasswordField
