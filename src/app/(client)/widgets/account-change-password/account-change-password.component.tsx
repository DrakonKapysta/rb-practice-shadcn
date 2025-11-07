'use client'

import { CheckCircle2, Shield, XCircle } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'

import { authChangePasswordMutationOptions } from '@/app/(client)/entities/api'
import {
  Button,
  Card,
  Checkbox,
  FieldGroup,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  PasswordField,
  ReminderComponent,
} from '@/app/(client)/shared/ui'
import { Link } from '@/pkg/libraries/locale'

import { PASSWORD_REQUIREMENTS } from './account-change-password.constant'
import { AccountChangePasswordSchema, IAccountChangePassword } from './account-change-password.interface'

interface IProps {}

const AccountChangePasswordComponent: FC<Readonly<IProps>> = () => {
  const form = useForm<IAccountChangePassword>({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      revokeOtherSessions: false,
    },
    resolver: zodResolver(AccountChangePasswordSchema),
  })

  const t = useTranslations('profile.accountChangePassword')

  const { mutateAsync: changePassword, isPending: isChangingPassword } = useMutation(
    authChangePasswordMutationOptions(),
  )

  const onSubmit = async (data: IAccountChangePassword) => {
    await changePassword({
      password: data.currentPassword,
      newPassword: data.newPassword,
      revokeOtherSessions: true,

      successCallback: () => {
        toast.success('Password changed successfully')

        form.reset()
      },

      errorCallback: (error) => {
        toast.error(error.error.message || 'An error occurred while changing the password')
      },
    })
  }

  return (
    <div className='mx-auto max-w-5xl p-6'>
      <Card className='bg-card border p-8'>
        <div className='grid grid-cols-1 gap-6 border-b pb-6 md:grid-cols-2'>
          <div className='flex items-center gap-3'>
            <div className='bg-primary/10 flex h-12 w-12 items-center justify-center rounded-lg'>
              <Shield className='text-primary h-6 w-6' />
            </div>

            <div>
              <h2 className='text-2xl font-semibold tracking-tight'>{t('title')}</h2>

              <p className='text-muted-foreground mt-1 text-sm'>{t('description')}</p>
            </div>
          </div>
          <div>
            <ReminderComponent
              title='Login with Social Accounts'
              description='If you logged in with social accounts, you will not have a password. So you need to go through forgot password process to set a new password.'
            >
              <Link className='text-primary text-sm' href={'/forgot-password'}>
                Forgot Password
              </Link>
            </ReminderComponent>
          </div>
        </div>

        <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
          <div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FieldGroup>
                  <FormField
                    control={form.control}
                    name='currentPassword'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('currentPassword')}</FormLabel>

                        <FormControl>
                          <PasswordField {...field} id='current-password' />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='newPassword'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('newPassword')}</FormLabel>

                        <FormControl>
                          <PasswordField id='new-password' {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='confirmPassword'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('confirmPassword')}</FormLabel>

                        <FormControl>
                          <PasswordField id='confirm-password' {...field} canShowPassword={false} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='revokeOtherSessions'
                    render={({ field }) => (
                      <FormItem className='flex gap-2'>
                        <FormLabel>{t('revokeOtherSessions')}</FormLabel>

                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} id='revoke-other-sessions' />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </FieldGroup>

                <div className='mt-8 flex gap-3'>
                  <Button type='submit' className='flex-1' disabled={isChangingPassword}>
                    {t('updatePassword')}
                  </Button>
                </div>
              </form>
            </Form>
          </div>

          <div className='space-y-6'>
            <div>
              <h3 className='mb-4 flex items-center gap-2 font-semibold'>
                <Shield className='text-muted-foreground h-5 w-5' />
                {t('passwordRecommendations')}
              </h3>

              <p className='text-muted-foreground mb-6 text-sm'>{t('passwordRecommendationsDescription')}</p>

              <ul className='space-y-3'>
                {PASSWORD_REQUIREMENTS.map((req, index) => {
                  const meetsRequirement = req.regex.test(form.watch('newPassword'))

                  return (
                    <li key={index} className='flex items-start gap-3'>
                      {meetsRequirement ? (
                        <CheckCircle2 className='mt-0.5 h-5 w-5 shrink-0 text-green-500' />
                      ) : (
                        <XCircle className='text-muted-foreground mt-0.5 h-5 w-5 shrink-0' />
                      )}

                      <span className={`text-sm ${meetsRequirement ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {t(`passwordRecommendationsItems.${req.id}`)}
                      </span>
                    </li>
                  )
                })}
              </ul>
            </div>

            <div className='bg-muted/50 rounded-lg border p-4'>
              <h4 className='mb-2 text-sm font-medium'>{t('securityBestPractices')}</h4>

              <ul className='text-muted-foreground space-y-2 text-sm'>
                <li className='flex items-start gap-2'>
                  <span className='mt-1'>•</span>

                  <span>{t('securityBestPracticesItems.changeRegularly')}</span>
                </li>

                <li className='flex items-start gap-2'>
                  <span className='mt-1'>•</span>

                  <span>{t('securityBestPracticesItems.neverShare')}</span>
                </li>

                <li className='flex items-start gap-2'>
                  <span className='mt-1'>•</span>

                  <span>{t('securityBestPracticesItems.uniquePassword')}</span>
                </li>

                <li className='flex items-start gap-2'>
                  <span className='mt-1'>•</span>

                  <span>{t('securityBestPracticesItems.passwordManager')}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default AccountChangePasswordComponent
