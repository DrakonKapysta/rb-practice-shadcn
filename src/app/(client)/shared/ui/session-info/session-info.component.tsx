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
import { useTranslations } from 'next-intl'

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
  const t = useTranslations('profile.accountSessions')

  return (
    <div className={`flex flex-col items-center justify-between gap-6 py-4 sm:flex-row`}>
      <div className='flex flex-col items-center gap-4 sm:flex-row'>
        <div className={`bg-muted/50 flex h-12 w-12 items-center justify-center rounded-lg`}>
          {icon || <Computer className='h-5 w-5 text-gray-400' />}
        </div>

        <div className='space-y-1'>
          <div className='flex items-center gap-2'>
            <h4 className='font-semibold'>{t('session')}</h4>

            {isCurrentSession && (
              <Badge variant='outline' className='border-green-500 bg-green-50 text-green-700'>
                {t('currentSession')}
              </Badge>
            )}
          </div>

          <div className='text-muted-foreground space-y-1 text-sm'>
            <div className='flex gap-2'>
              <Clock className='h-4 w-4 shrink-0' />

              <p>
                <span className='font-semibold'>{t('lastLogin')}: </span>{' '}
                {updatedAt ? updatedAt.toLocaleString() : t('unknown')}
              </p>
            </div>

            <div className='flex gap-2'>
              <Globe className='h-4 w-4 shrink-0' />

              <p>
                <span className='font-semibold'>{t('agent')}: </span> {userAgent ? userAgent : t('unknown')}
              </p>
            </div>

            <div className='flex gap-2'>
              <MapPin className='h-4 w-4 shrink-0' />

              <p>
                <span className='font-semibold'>{t('ipAddress')}: </span> {ipAddress || t('unknown')}
              </p>
            </div>
          </div>
        </div>
      </div>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant='destructive' className='w-full sm:w-auto' disabled={isRevoking}>
            {t('revoke')}
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('revokeSessionTitle')}</AlertDialogTitle>

            <AlertDialogDescription>{t('revokeSessionDescription')}</AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>{t('cancelAlertDialog')}</AlertDialogCancel>

            <AlertDialogAction onClick={onRevoke}>{t('revoke')}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default SessionInfoComponent
