'use client'

import { useTranslations } from 'next-intl'
import { FC, useState } from 'react'
import { toast } from 'sonner'

import { useMutation, useQuery } from '@tanstack/react-query'

import {
  authServerSessionListQueryOptions,
  revokeAllSessionsOnServerMutationOptions,
  revokeOtherSessionsOnServerMutationOptions,
  revokeSessionOnServerMutationOptions,
} from '@/app/(client)/entities/api'
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
  Button,
  Separator,
  SessionInfoComponent,
  Spinner,
} from '@/app/(client)/shared/ui'
import { Session } from '@/pkg/integrations/better-auth'
import { useRouter } from '@/pkg/libraries/locale'

import { getDeviceIcon } from './account-session-info.service'

interface IProps {
  session: Session['session'] | null
}

const AccountSessionInfoComponent: FC<Readonly<IProps>> = (props) => {
  const { session } = props

  const { data: sessions, isLoading: isSessionsLoading, refetch } = useQuery(authServerSessionListQueryOptions())

  const { mutateAsync: revokeSession } = useMutation(revokeSessionOnServerMutationOptions())

  const { mutateAsync: revokeAllSessions } = useMutation(revokeAllSessionsOnServerMutationOptions())

  const { mutateAsync: revokeOtherSessions } = useMutation(revokeOtherSessionsOnServerMutationOptions())

  const t = useTranslations('profile.accountSessions')

  const [revokingSession, setRevokingSession] = useState<string | null>(null)

  const router = useRouter()

  const handleRevokeAllSessions = async () => {
    const response = await revokeAllSessions()

    if (!response?.success || response?.error) {
      return toast.error(response.error?.message || t('toast.sessionRevokeFailed'))
    }

    toast.success(t('toast.allSessionsRevokedSuccessfully'))

    router.refresh()
  }

  const handleRevokeOtherSessions = async () => {
    const response = await revokeOtherSessions()

    if (!response?.success || response?.error) {
      return toast.error(response.error?.message || t('toast.sessionRevokeFailed'))
    }

    toast.success(t('toast.allSessionsRevokedSuccessfully'))

    router.refresh()
  }

  const handleRevokeSession = async (sessionToken: string) => {
    setRevokingSession(sessionToken)
    const response = await revokeSession(sessionToken)

    if (!response?.success || response?.error) {
      setRevokingSession(null)

      await refetch()

      router.refresh()

      return toast.error(response.error?.message || t('toast.sessionRevokeFailed'))
    }

    toast.success(t('toast.sessionRevokedSuccessfully'))

    await refetch()

    router.refresh()

    setRevokingSession(null)
  }

  return (
    <>
      <SessionInfoComponent
        icon={getDeviceIcon(session?.userAgent)}
        userAgent={session?.userAgent}
        ipAddress={session?.ipAddress}
        updatedAt={session?.updatedAt}
        onRevoke={() => handleRevokeSession(session?.token ?? '')}
        isCurrentSession={true}
      />

      {isSessionsLoading ? (
        <Spinner className='mx-auto inline-block' />
      ) : (
        <div className='flex flex-col gap-4'>
          {sessions?.result?.slice(0, sessions.result.length - 1).map((session) => (
            <SessionInfoComponent
              key={`${session.id}-${session.updatedAt}`}
              icon={getDeviceIcon(session.userAgent)}
              userAgent={session.userAgent}
              ipAddress={session.ipAddress}
              updatedAt={session.updatedAt}
              isCurrentSession={false}
              onRevoke={() => handleRevokeSession(session.token)}
              isRevoking={session.token === revokingSession}
            />
          ))}
        </div>
      )}

      <Separator />

      <div className='flex flex-col gap-4 sm:flex-row'>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant='default' size='default'>
              {t('revokeOtherSessions')}
            </Button>
          </AlertDialogTrigger>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{t('revokeOtherSessionsTitle')}</AlertDialogTitle>

              <AlertDialogDescription>{t('revokeOtherSessionsDescription')}</AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel>{t('cancelAlertDialog')}</AlertDialogCancel>

              <AlertDialogAction onClick={handleRevokeOtherSessions}>{t('revokeOtherSessions')}</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant='outline' size='default'>
              {t('revokeAllSessions')}
            </Button>
          </AlertDialogTrigger>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{t('revokeAllSessionsTitle')}</AlertDialogTitle>

              <AlertDialogDescription>{t('revokeAllSessionsDescription')}</AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel>{t('cancelAlertDialog')}</AlertDialogCancel>

              <AlertDialogAction onClick={handleRevokeAllSessions}>{t('revokeAllSessions')}</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  )
}

export default AccountSessionInfoComponent
