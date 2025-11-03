'use client'

import { ShieldCheck } from 'lucide-react'

import { SessionInfoComponent, Spinner } from '@/app/(client)/shared/ui'
import { Card } from '@/app/(client)/shared/ui/card'
import { authClient } from '@/pkg/integrations/better-auth/auth-client'

export default function AccountSessionsComponent() {
  const { data: currentSession, isPending: isCurrentSessionPending } = authClient.useSession()

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

        {isCurrentSessionPending ? (
          <Spinner className='inline-block' />
        ) : (
          <SessionInfoComponent
            userAgent={currentSession?.session.userAgent}
            ipAddress={currentSession?.session.ipAddress}
            updatedAt={currentSession?.session.updatedAt}
          />
        )}

        <div className='bg-muted/50 mt-6 rounded-lg border p-4'>
          <div className='flex flex-col items-start gap-3 sm:flex-row'>
            <ShieldCheck className='mt-0.5 h-5 w-5 shrink-0 text-blue-500' />

            <div>
              <h4 className='mb-1 text-sm font-medium'>Security Tip</h4>

              <p className='text-muted-foreground text-sm'>
                If you notice any suspicious activity, immediately remove the session and change your account password.
                Enable two-factor authentication for additional security.
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
