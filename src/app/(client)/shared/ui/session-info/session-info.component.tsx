import { Clock, Computer, Globe, MapPin } from 'lucide-react'
import { FC } from 'react'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Badge,
  Button,
} from '@/app/(client)/shared/ui'

interface IProps {
  icon?: React.ReactNode
  userAgent?: string | null
  ipAddress?: string | null
  updatedAt?: Date | null
  isCurrentSession?: boolean
  onRevoke?: () => void
  isRevoking?: boolean
}

const SessionInfoComponent: FC<IProps> = (props) => {
  const { icon, userAgent, ipAddress, updatedAt, isCurrentSession, onRevoke, isRevoking } = props
  return (
    <div className={`flex flex-col items-center justify-between gap-6 py-4 sm:flex-row`}>
      <div className='flex flex-col items-center gap-4 sm:flex-row'>
        <div className={`bg-muted/50 flex h-12 w-12 items-center justify-center rounded-lg`}>
          {icon || <Computer className='h-5 w-5 text-gray-400' />}
        </div>

        <div className='space-y-1'>
          <div className='flex items-center gap-2'>
            <h4 className='font-semibold'>Session</h4>

            {isCurrentSession && (
              <Badge variant='outline' className='border-green-500 bg-green-50 text-green-700'>
                Current Session
              </Badge>
            )}
          </div>

          <div className='text-muted-foreground space-y-1 text-sm'>
            <div className='flex gap-2'>
              <Clock className='h-4 w-4 shrink-0' />

              <p>
                <span className='font-semibold'>Last login: </span> {updatedAt ? updatedAt.toLocaleString() : 'Unknown'}
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

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant='destructive' className='w-full sm:w-auto' disabled={isRevoking}>
            Revoke
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure you want to revoke this session?</AlertDialogTitle>
            <AlertDialogDescription>
              This will revoke the session and remove it from your account. You will need to login again to access your
              account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onRevoke}>Revoke</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default SessionInfoComponent
