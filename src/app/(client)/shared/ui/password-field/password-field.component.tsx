'use client'

import { Label, Input, Button } from '@/app/(client)/shared/ui'
import { Eye, EyeOff, Lock } from 'lucide-react'
import { ComponentPropsWithoutRef, FC, useState } from 'react'

interface IProps extends ComponentPropsWithoutRef<typeof Input> {
  id: string
}

const PasswordField: FC<Readonly<IProps>> = (props) => {
  const { id, ...rest } = props
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className='relative'>
      <Input {...rest} id={id} type={showPassword ? 'text' : 'password'} placeholder='••••••••' />

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
    </div>
  )
}

export default PasswordField
