'use client'

import { Laptop, Table, User } from 'lucide-react'
import * as React from 'react'

import {
  Badge,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/app/(client)/shared/ui'
import { authClient } from '@/pkg/integrations/better-auth/auth-client'
import { Link } from '@/pkg/libraries/locale'
import { AuthUtil } from '@/pkg/utils/auth'
import { cn } from '@/pkg/utils/ui'

import { Profile } from './profile-dropdown.interface'

import { LogoutButtonComponent } from '../logout-button'
import { ProfileTriggerButtonComponent } from '../profile-trigger-button'

interface ProfileDropdownProps extends React.HTMLAttributes<HTMLDivElement> {
  data?: Profile
  showTopbar?: boolean
}

export default function ProfileDropdownComponent({ className, ...props }: ProfileDropdownProps) {
  const [isOpen, setIsOpen] = React.useState(false)

  const { data: session } = authClient.useSession()

  if (!session) return null

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
            <ProfileTriggerButtonComponent
              name={session?.user?.name}
              email={session?.user?.email}
              avatar={
                session?.user?.image ||
                'https://ferf1mheo22r9ira.public.blob.vercel-storage.com/profile-mjss82WnWBRO86MHHGxvJ2TVZuyrDv.jpeg'
              }
            />
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align='end'
            sideOffset={4}
            className='data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 w-64 origin-top-right rounded-2xl border border-zinc-200/60 bg-white/95 p-2 shadow-xl shadow-zinc-900/5 backdrop-blur-sm dark:border-zinc-800/60 dark:bg-zinc-900/95 dark:shadow-zinc-950/20'
          >
            <div className='space-y-1'>
              <DropdownMenuItem asChild>
                <Link
                  href='/profile'
                  className='group flex cursor-pointer items-center rounded-xl border border-transparent p-3 transition-all duration-200 hover:border-zinc-200/50 hover:bg-zinc-100/80 hover:shadow-sm dark:hover:border-zinc-700/50 dark:hover:bg-zinc-800/60'
                >
                  <div className='flex flex-1 items-center gap-2'>
                    <User />

                    <span className='text-sm leading-tight font-medium tracking-tight whitespace-nowrap text-zinc-900 transition-colors group-hover:text-zinc-950 dark:text-zinc-100 dark:group-hover:text-zinc-50'>
                      Profile
                    </span>
                  </div>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link
                  href='/profile/sessions'
                  className='group flex cursor-pointer items-center rounded-xl border border-transparent p-3 transition-all duration-200 hover:border-zinc-200/50 hover:bg-zinc-100/80 hover:shadow-sm dark:hover:border-zinc-700/50 dark:hover:bg-zinc-800/60'
                >
                  <div className='flex flex-1 items-center gap-2'>
                    <Laptop />

                    <span className='text-sm leading-tight font-medium tracking-tight whitespace-nowrap text-zinc-900 transition-colors group-hover:text-zinc-950 dark:text-zinc-100 dark:group-hover:text-zinc-50'>
                      Devices
                    </span>
                  </div>
                </Link>
              </DropdownMenuItem>

              {AuthUtil.isAdmin(session?.user?.role) && (
                <DropdownMenuItem asChild>
                  <Link
                    href='/admin-dashboard'
                    className='group flex cursor-pointer items-center rounded-xl border border-transparent p-3 transition-all duration-200 hover:border-zinc-200/50 hover:bg-zinc-100/80 hover:shadow-sm dark:hover:border-zinc-700/50 dark:hover:bg-zinc-800/60'
                  >
                    <div className='flex flex-1 items-center gap-2'>
                      <Table />

                      <span className='text-sm leading-tight font-medium tracking-tight whitespace-nowrap text-zinc-900 transition-colors group-hover:text-zinc-950 dark:text-zinc-100 dark:group-hover:text-zinc-50'>
                        Users Table
                      </span>
                    </div>

                    <Badge
                      variant='secondary'
                      className='border border-blue-500/10 bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400'
                    >
                      ADMIN
                    </Badge>
                  </Link>
                </DropdownMenuItem>
              )}
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
