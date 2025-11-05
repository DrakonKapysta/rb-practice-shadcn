'use client'

import { ShieldCheck } from 'lucide-react'
import { FC, useState } from 'react'
import { toast } from 'sonner'

import { useMutation, useQuery } from '@tanstack/react-query'

import {
  authRevokeAllSessionsMutationOptions,
  authRevokeOtherSessionsMutationOptions,
  authRevokeSessionMutationOptions,
  authSessionListQueryOptions,
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
  NotFoundComponent,
  Separator,
  SessionInfoComponent,
  Spinner,
} from '@/app/(client)/shared/ui'
import { Card } from '@/app/(client)/shared/ui/card'
import { authClient } from '@/pkg/integrations/better-auth/auth-client'
import { useRouter } from '@/pkg/libraries/locale'

import { getDeviceIcon } from './account-sessions.service'
import { useTranslations } from 'next-intl'

interface IProps {}

const AccountSessionsComponent: FC<Readonly<IProps>> = () => {
  const {
    data: currentSession,
    isPending: isCurrentSessionPending,
    isRefetching: isRefetchingCurrentSessions,
    refetch,
  } = authClient.useSession()

  const t = useTranslations('profile.accountSessions')

  const { data: sessions, isLoading: isSessionsLoading } = useQuery(authSessionListQueryOptions())

  const { mutateAsync: revokeSession } = useMutation(authRevokeSessionMutationOptions())

  const { mutateAsync: revokeAllSessions } = useMutation(authRevokeAllSessionsMutationOptions())

  const { mutateAsync: revokeOtherSessions } = useMutation(authRevokeOtherSessionsMutationOptions())

  const [revokingSession, setRevokingSession] = useState<string | null>(null)

  const router = useRouter()

  const isLoading = isCurrentSessionPending || isRefetchingCurrentSessions

  const handleRevokeAllSessions = async () => {
    await revokeAllSessions({
      successCallback: () => {
        toast.success(t('toast.allSessionsRevokedSuccessfully'))

        refetch()

        router.push('/admin-dashboard')

        router.refresh()
      },

      errorCallback: (error) => {
        toast.error(error.error.message)
      },
    })
  }

  const handleRevokeOtherSessions = async () => {
    await revokeOtherSessions({
      successCallback: () => {
        toast.success(t('toast.otherSessionsRevokedSuccessfully'))
      },

      errorCallback: (error) => {
        toast.error(error.error.message)
      },
    })
  }

  const handleRevokeSession = async (sessionToken: string, isCurrentSession?: boolean) => {
    setRevokingSession(sessionToken)

    await revokeSession({
      sessionToken,

      successCallback: () => {
        toast.success(t('toast.sessionRevokedSuccessfully'))

        refetch()

        if (isCurrentSession) {
          router.push('/admin-dashboard')
        }

        router.refresh()
      },

      errorCallback: (error) => {
        toast.error(error.error.message)
      },
    })

    setRevokingSession(null)
  }

  if (!currentSession?.session) {
    return (
      <div className='flex h-full items-center justify-center'>
        <NotFoundComponent
          title={t('noActiveSessions')}
          description={t('noActiveSessionsDescription')}
          buttonText={t('goBack')}
        />
      </div>
    )
  }

  return (
    <div className='mx-auto max-w-5xl p-6'>
      <Card className='bg-card border p-8'>
        <div className='border-b pb-6'>
          <div className='flex flex-col items-center gap-3 sm:flex-row'>
            <div className='bg-primary/10 flex h-12 w-12 items-center justify-center rounded-lg'>
              <ShieldCheck className='text-primary h-6 w-6' />
            </div>

            <div>
              <h2 className='text-2xl font-semibold tracking-tight'>{t('activeSessions')}</h2>

              <p className='text-muted-foreground mt-1 text-sm'>{t('activeSessionsDescription')}</p>
            </div>
          </div>
        </div>

        {isLoading ? (
          <Spinner className='inline-block' />
        ) : (
          <SessionInfoComponent
            icon={getDeviceIcon(currentSession?.session.userAgent)}
            userAgent={currentSession?.session.userAgent}
            ipAddress={currentSession?.session.ipAddress}
            updatedAt={currentSession?.session.updatedAt}
            onRevoke={() => handleRevokeSession(currentSession?.session.token ?? '', true)}
            isCurrentSession={true}
          />
        )}

        {isSessionsLoading ? (
          <Spinner className='inline-block' />
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

        <div className='bg-muted/50 mt-6 rounded-lg border p-4'>
          <div className='flex flex-col items-start gap-3 sm:flex-row'>
            <ShieldCheck className='mt-0.5 h-5 w-5 shrink-0 text-blue-500' />

            <div>
              <h4 className='mb-1 text-sm font-medium'>{t('securityTip')}</h4>

              <p className='text-muted-foreground text-sm'>{t('securityTipDescription')}</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default AccountSessionsComponent
