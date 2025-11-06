'use client'

import { Info, Mail, Shield } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { isEmail } from 'validator'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'

import { authChangeEmailMutationOptions } from '@/app/(client)/entities/api'
import {
  Button,
  Card,
  FieldGroup,
  FieldLabel,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
  ReminderComponent,
  Separator,
  Spinner,
  ValidationMessageComponent,
} from '@/app/(client)/shared/ui'
import { authClient } from '@/pkg/integrations/better-auth/auth-client'

import { AccountEmailChangeSchema, IAccountEmailChange } from './account-email-change.interface'
import { EmailChangeProcessComponent, EmailFeaturePointComponent } from './elements'

interface IProps {}

const AccountEmailChangeComponent: FC<Readonly<IProps>> = () => {
  const t = useTranslations('profile.accountEmailChange')

  const { data: session, refetch } = authClient.useSession()

  const { mutateAsync: changeEmail, isPending } = useMutation(authChangeEmailMutationOptions())

  const form = useForm<IAccountEmailChange>({
    defaultValues: {
      newEmail: '',
    },

    resolver: zodResolver(AccountEmailChangeSchema),
  })

  const onSubmit = async (data: IAccountEmailChange) => {
    await changeEmail({
      email: data.newEmail,

      successCallback: () => {
        toast.success(t('toast.success'))

        refetch()

        form.reset()

        form.setValue('currentEmail', data.newEmail)
      },

      errorCallback: (error) => {
        toast.error(error.error.message || t('toast.error'))
      },
    })
  }

  const currentEmail = form.getValues('currentEmail')
  const newEmail = form.watch('newEmail')

  return (
    <div className='mx-auto w-full max-w-5xl p-6'>
      <Card className='bg-card w-full border p-8'>
        <div className='border-b pb-6'>
          <div className='flex items-center gap-3'>
            <div className='bg-primary/10 flex h-12 w-12 items-center justify-center rounded-lg'>
              <Mail className='text-primary h-6 w-6' />
            </div>

            <div>
              <h2 className='text-2xl font-semibold tracking-tight'>{t('title')}</h2>

              <p className='text-muted-foreground mt-1 text-sm'>{t('description')}</p>
            </div>
          </div>
        </div>

        <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
          <div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FieldGroup>
                  <FormField
                    control={form.control}
                    name='currentEmail'
                    render={({ field }) => (
                      <FormItem>
                        <FieldLabel>{t('currentEmail')}</FieldLabel>

                        <FormControl>
                          <Input
                            {...field}
                            id='current-email'
                            placeholder={t('currentEmailPlaceholder')}
                            type='email'
                            defaultValue={session?.user?.email}
                            disabled={true}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <ReminderComponent type='default' description={t('currentEmailDescription')} />

                  <FormField
                    control={form.control}
                    name='newEmail'
                    render={({ field }) => (
                      <FormItem>
                        <FieldLabel>{t('newEmail')}</FieldLabel>

                        <FormControl>
                          <Input {...field} id='new-email' placeholder={t('newEmailPlaceholder')} type='email' />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <ReminderComponent type='default' description={t('newEmailDescription')} />

                  {newEmail && currentEmail && newEmail === currentEmail && (
                    <ValidationMessageComponent type='error' message={t('validation.emailMustBeDifferent')} />
                  )}

                  {newEmail && isEmail(newEmail) && newEmail !== currentEmail && (
                    <ValidationMessageComponent type='success' message={t('validation.emailValidAndReady')} />
                  )}
                </FieldGroup>

                <div className='mt-8 flex gap-3'>
                  <Button disabled={isPending} type='submit' className='flex-1'>
                    {isPending ? <Spinner /> : t('updateEmail')}
                  </Button>
                </div>
              </form>
            </Form>
          </div>

          <div className='space-y-6'>
            <div>
              <h3 className='mb-4 flex items-center gap-2 font-semibold'>
                <Shield className='text-muted-foreground h-5 w-5' />
                {t('importantInformation.title')}
              </h3>

              <p className='text-muted-foreground mb-6 text-sm'>{t('importantInformation.description')}</p>

              <div className='space-y-4'>
                <EmailFeaturePointComponent
                  title={t('importantInformation.emailVerification.title')}
                  description={t('importantInformation.emailVerification.description')}
                  icon={<Mail className='text-primary h-4 w-4' />}
                />

                <EmailFeaturePointComponent
                  title={t('importantInformation.accountSecurity.title')}
                  description={t('importantInformation.accountSecurity.description')}
                  icon={<Shield className='text-primary h-4 w-4' />}
                />

                <EmailFeaturePointComponent
                  title={t('importantInformation.accessToAccount.title')}
                  description={t('importantInformation.accessToAccount.description')}
                  icon={<Info className='text-primary h-4 w-4' />}
                />
              </div>
            </div>

            <Separator />

            <div className='bg-muted/50 rounded-lg border p-4'>
              <h4 className='mb-3 text-sm font-medium'>{t('emailChangeProcess.title')}</h4>

              <EmailChangeProcessComponent />
            </div>

            <ReminderComponent
              type='info'
              title={t('securityReminder.title')}
              description={t('securityReminder.description')}
            />
          </div>
        </div>
      </Card>
    </div>
  )
}

export default AccountEmailChangeComponent
