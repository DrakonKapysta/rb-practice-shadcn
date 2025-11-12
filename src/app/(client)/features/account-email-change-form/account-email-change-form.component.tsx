'use client'

import { useTranslations } from 'next-intl'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { isEmail } from 'validator'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'

import { changeEmailOnServerMutationOptions } from '@/app/(client)/entities/api'
import {
  Button,
  FieldGroup,
  FieldLabel,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
  ReminderComponent,
  Spinner,
  ValidationMessageComponent,
} from '@/app/(client)/shared/ui'
import { Session } from '@/pkg/integrations/better-auth'

import { AccountEmailChangeFormSchema, IAccountEmailChangeForm } from './account-email-change-form.interface'

interface IProps {
  session?: Session | null
}

const AccountEmailChangeFormComponent: FC<Readonly<IProps>> = (props) => {
  const { session } = props

  const t = useTranslations('profile.accountEmailChange')

  const form = useForm<IAccountEmailChangeForm>({
    defaultValues: {
      currentEmail: session?.user?.email || '',
      newEmail: '',
    },

    resolver: zodResolver(AccountEmailChangeFormSchema),
  })

  const { mutateAsync: changeEmail, isPending } = useMutation(changeEmailOnServerMutationOptions())

  const newEmail = form.watch('newEmail')

  const currentEmail = session?.user?.email

  const onSubmit = async (data: IAccountEmailChangeForm) => {
    const result = await changeEmail(data.newEmail)

    if (!result?.success || result.error) {
      return toast.error(result?.error?.message || 'Failed to change email')
    }

    toast.success('Email changed successfully')
  }

  return (
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
                    id='current-email'
                    {...field}
                    placeholder={t('currentEmailPlaceholder')}
                    type='email'
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
  )
}

export default AccountEmailChangeFormComponent
