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

interface IProps {}

const AccountSessionsComponent: FC<Readonly<IProps>> = () => {
  const {
    data: currentSession,
    isPending: isCurrentSessionPending,
    isRefetching: isRefetchingCurrentSessions,
    refetch,
  } = authClient.useSession()

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
        toast.success('All sessions revoked successfully')

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
        toast.success('Other sessions revoked successfully')
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
        toast.success('Session revoked successfully')

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
        <NotFoundComponent title='No active sessions' description='You have no active sessions' buttonText='Go back' />
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
              <h2 className='text-2xl font-semibold tracking-tight'>Active Sessions</h2>

              <p className='text-muted-foreground mt-1 text-sm'>
                Manage and monitor devices that have access to your account
              </p>
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
                Revoke Other Sessions
              </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure you want to revoke other sessions?</AlertDialogTitle>

                <AlertDialogDescription>
                  This will revoke other sessions and remove them from your account. You will need to login again to
                  access your account.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>

                <AlertDialogAction onClick={handleRevokeOtherSessions}>Revoke Other Sessions</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant='outline' size='default'>
                Revoke All Sessions
              </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure you want to revoke all sessions?</AlertDialogTitle>

                <AlertDialogDescription>
                  This will revoke all sessions and remove them from your account. You will need to login again to
                  access your account.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>

                <AlertDialogAction onClick={handleRevokeAllSessions}>Revoke All Sessions</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        <div className='bg-muted/50 mt-6 rounded-lg border p-4'>
          <div className='flex flex-col items-start gap-3 sm:flex-row'>
            <ShieldCheck className='mt-0.5 h-5 w-5 shrink-0 text-blue-500' />

            <div>
              <h4 className='mb-1 text-sm font-medium'>Security Tip</h4>

              <p className='text-muted-foreground text-sm'>
                If you notice any suspicious activity, immediately revoke the session and change your account password.
                Enable two-factor authentication for additional security.
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default AccountSessionsComponent
