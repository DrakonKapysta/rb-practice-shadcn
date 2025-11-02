'use client'

import { CreditCard, FileText, Settings, User } from 'lucide-react'
import Image from 'next/image'
import * as React from 'react'

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/app/(client)/shared/ui'
import { authClient } from '@/pkg/integrations/better-auth/auth-client'
import { Link } from '@/pkg/libraries/locale'
import { cn } from '@/pkg/utils/ui/ui.util'

import { MenuItem, Profile } from './profile-dropdown.interface'

import { LogoutButtonComponent } from '../logout-button'

const SAMPLE_PROFILE_DATA: Profile = {
  name: 'Eugene An',
  email: 'eugene@kokonutui.com',
  avatar: 'https://ferf1mheo22r9ira.public.blob.vercel-storage.com/profile-mjss82WnWBRO86MHHGxvJ2TVZuyrDv.jpeg',
  subscription: 'PRO',
}

interface ProfileDropdownProps extends React.HTMLAttributes<HTMLDivElement> {
  data?: Profile
  showTopbar?: boolean
}

export default function ProfileDropdownComponent({
  data = SAMPLE_PROFILE_DATA,
  className,
  ...props
}: ProfileDropdownProps) {
  const [isOpen, setIsOpen] = React.useState(false)

  const { data: session } = authClient.useSession()

  const menuItems: MenuItem[] = [
    {
      label: 'Profile',
      href: '#',
      icon: <User className='h-4 w-4' />,
    },
    {
      label: 'Subscription',
      value: data.subscription,
      href: '#',
      icon: <CreditCard className='h-4 w-4' />,
    },
    {
      label: 'Settings',
      href: '#',
      icon: <Settings className='h-4 w-4' />,
    },
    {
      label: 'Terms & Policies',
      href: '#',
      icon: <FileText className='h-4 w-4' />,
      external: true,
    },
  ]

  return (
    <div
      className={cn(
        'relative',
        {
          hidden: !session,
        },
        className,
      )}
      {...props}
    >
      <DropdownMenu onOpenChange={setIsOpen} open={isOpen}>
        <div className='group relative'>
          <DropdownMenuTrigger asChild>
            <Button variant='outline' className='flex justify-between gap-x-4 px-2' size='lg'>
              <div className='flex-1 text-left'>
                <div className='text-sm leading-tight font-medium tracking-tight text-zinc-900 dark:text-zinc-100'>
                  {data.name}
                </div>

                <div className='text-xs leading-tight tracking-tight text-zinc-500 dark:text-zinc-400'>
                  {data.email}
                </div>
              </div>

              <div className='relative'>
                <div className='h-6 w-6 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 p-0.5'>
                  <div className='h-full w-full overflow-hidden rounded-full bg-white dark:bg-zinc-900'>
                    <Image
                      src={data.avatar}
                      alt={data.name}
                      width={36}
                      height={36}
                      className='h-full w-full rounded-full object-cover'
                    />
                  </div>
                </div>
              </div>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align='end'
            sideOffset={4}
            className='data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 w-64 origin-top-right rounded-2xl border border-zinc-200/60 bg-white/95 p-2 shadow-xl shadow-zinc-900/5 backdrop-blur-sm dark:border-zinc-800/60 dark:bg-zinc-900/95 dark:shadow-zinc-950/20'
          >
            <div className='space-y-1'>
              {menuItems.map((item) => (
                <DropdownMenuItem key={item.label} asChild>
                  <Link
                    href={item.href}
                    className='group flex cursor-pointer items-center rounded-xl border border-transparent p-3 transition-all duration-200 hover:border-zinc-200/50 hover:bg-zinc-100/80 hover:shadow-sm dark:hover:border-zinc-700/50 dark:hover:bg-zinc-800/60'
                  >
                    <div className='flex flex-1 items-center gap-2'>
                      {item.icon}

                      <span className='text-sm leading-tight font-medium tracking-tight whitespace-nowrap text-zinc-900 transition-colors group-hover:text-zinc-950 dark:text-zinc-100 dark:group-hover:text-zinc-50'>
                        {item.label}
                      </span>
                    </div>

                    <div className='ml-auto flex-shrink-0'>
                      {item.value && (
                        <span
                          className={cn(
                            'rounded-md px-2 py-1 text-xs font-medium tracking-tight',
                            item.label === 'Model'
                              ? 'border border-blue-500/10 bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400'
                              : 'border border-purple-500/10 bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400',
                          )}
                        >
                          {item.value}
                        </span>
                      )}
                    </div>
                  </Link>
                </DropdownMenuItem>
              ))}
            </div>

            <DropdownMenuSeparator className='my-3 bg-gradient-to-r from-transparent via-zinc-200 to-transparent dark:via-zinc-800' />

            <DropdownMenuItem asChild>
              <LogoutButtonComponent onClose={() => setIsOpen(false)} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </div>
      </DropdownMenu>
    </div>
  )
}
