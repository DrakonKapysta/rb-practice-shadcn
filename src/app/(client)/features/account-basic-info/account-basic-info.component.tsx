'use client'

import { format } from 'date-fns'
import { CalendarIcon, Mail, MapPin, Phone, User } from 'lucide-react'
import * as React from 'react'

import {
  Button,
  Calendar,
  Card,
  Input,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/(client)/shared/ui'
import { authClient } from '@/pkg/integrations/better-auth/auth-client'

export default function AccountBasicInfoComponent() {
  const [birthDate, setBirthDate] = React.useState<Date>()

  const { data: session } = authClient.useSession()

  if (!session) return null

  return (
    <div className='mx-auto max-w-5xl p-6'>
      <Card className='bg-card border p-8'>
        <div className='border-b pb-6'>
          <h2 className='text-2xl font-semibold tracking-tight'>Personal Information</h2>

          <p className='text-muted-foreground mt-2 text-sm'>
            Manage your personal details and profile information. This information will be visible to other users on the
            platform.
          </p>
        </div>

        <form className='space-y-8'>
          <div className='space-y-6'>
            <div>
              <h3 className='mb-4 text-sm font-medium'>Basic Details</h3>

              <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                <div className='space-y-2'>
                  <Label htmlFor='firstName' className='flex items-center gap-2'>
                    <User className='text-muted-foreground h-4 w-4' />
                    First Name
                  </Label>

                  <Input id='firstName' placeholder='Emma' />
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='lastName' className='flex items-center gap-2'>
                    <User className='text-muted-foreground h-4 w-4' />
                    Last Name
                  </Label>

                  <Input id='lastName' placeholder='Roberts' />
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='firstName' className='flex items-center gap-2'>
                    <User className='text-muted-foreground h-4 w-4' />
                    Username
                  </Label>

                  <Input id='firstName' placeholder='Emma' defaultValue={session?.user?.name} />
                </div>
              </div>
            </div>

            <div>
              <h3 className='mb-4 text-sm font-medium'>Professional Information</h3>

              <div className='flex flex-col gap-6 sm:flex-row sm:items-end'>
                <div className='flex flex-col gap-2'>
                  <Label htmlFor='gender' className='flex items-center gap-2'>
                    <User className='text-muted-foreground h-4 w-4' />
                    Gender
                  </Label>

                  <Select defaultValue='prefer-not-to-say'>
                    <SelectTrigger id='gender'>
                      <SelectValue placeholder='Select Gender' />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value='male'>Male</SelectItem>

                      <SelectItem value='female'>Female</SelectItem>

                      <SelectItem value='other'>Other</SelectItem>

                      <SelectItem value='prefer-not-to-say'>Prefer not to say</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className='flex flex-col gap-2'>
                  <Label className='flex items-center gap-2'>
                    <CalendarIcon className='text-muted-foreground h-4 w-4' />
                    Birth Date
                  </Label>

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant='outline' className='w-full justify-start text-left font-normal'>
                        <CalendarIcon className='mr-2 h-4 w-4' />

                        {birthDate ? format(birthDate, 'PPP') : 'Select a date'}
                      </Button>
                    </PopoverTrigger>

                    <PopoverContent className='w-auto p-0' align='start'>
                      <Calendar mode='single' selected={birthDate} onSelect={setBirthDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>

            <div>
              <h3 className='mb-4 text-sm font-medium'>Contact Information</h3>

              <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                <div className='space-y-2'>
                  <Label htmlFor='email' className='flex items-center gap-2'>
                    <Mail className='text-muted-foreground h-4 w-4' />
                    Email Address
                  </Label>

                  <Input id='email' type='email' placeholder='emma@mail.com' defaultValue={session?.user?.email} />
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='phone' className='flex items-center gap-2'>
                    <Phone className='text-muted-foreground h-4 w-4' />
                    Phone Number
                  </Label>

                  <Input id='phone' placeholder='+1 (555) 123-4567' />
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='location' className='flex items-center gap-2'>
                    <MapPin className='text-muted-foreground h-4 w-4' />
                    Location
                  </Label>

                  <Input id='location' placeholder='City, Country' />
                </div>
              </div>
            </div>
          </div>

          <div className='flex justify-end gap-3 border-t pt-6'>
            <Button type='button' variant='outline'>
              Cancel
            </Button>

            <Button type='submit'>Save Changes</Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
