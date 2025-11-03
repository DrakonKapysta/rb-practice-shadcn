import { Clock, Globe, MapPin } from 'lucide-react'
import { FC } from 'react'

import { getDeviceIcon } from '@/app/(client)/features/account-sessions/account-sessions.service'
import { Badge } from '@/app/(client)/shared/ui'

interface IProps {
  userAgent?: string | null
  ipAddress?: string | null
  updatedAt?: Date | null
}

const SessionInfoComponent: FC<IProps> = (props) => {
  const { userAgent, ipAddress, updatedAt } = props
  return (
    <div className={`flex items-center justify-between gap-6 py-4`}>
      <div className='flex flex-col items-center gap-4 sm:flex-row'>
        <div className={`bg-muted/50 flex h-12 w-12 items-center justify-center rounded-lg`}>
          {getDeviceIcon(userAgent)}
        </div>

        <div className='space-y-1'>
          <div className='flex items-center gap-2'>
            <h4 className='font-semibold'>Session</h4>

            <Badge variant='outline' className='border-green-500 bg-green-50 text-green-700'>
              Current Session
            </Badge>
          </div>

          <div className='text-muted-foreground space-y-1 text-sm'>
            <div className='flex gap-2'>
              <Clock className='h-4 w-4 shrink-0' />

              <p>
                <span className='font-semibold'>Last active: </span>{' '}
                {updatedAt ? updatedAt.toLocaleString() : 'Unknown'}
              </p>
            </div>

            <div className='flex gap-2'>
              <Globe className='h-4 w-4 shrink-0' />

              <p>
                <span className='font-semibold'>Agent: </span> {userAgent ? userAgent : 'Unknown'}
              </p>
            </div>

            <div className='flex gap-2'>
              <MapPin className='h-4 w-4 shrink-0' />

              <p>
                <span className='font-semibold'>Ip Address: </span> {ipAddress || 'Unknown'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SessionInfoComponent
