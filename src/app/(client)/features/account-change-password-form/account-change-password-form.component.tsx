'use client'

import { CheckCircle2, Shield, XCircle } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'

import { changePasswordOnServerMutationOptions } from '@/app/(client)/entities/api'
import {
  Button,
  Checkbox,
  FieldGroup,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  PasswordField,
} from '@/app/(client)/shared/ui'
import { useRouter } from '@/pkg/libraries/locale'

import { PASSWORD_REQUIREMENTS } from './account-change-password.constant'
import { AccountChangePasswordFormSchema, IAccountChangePasswordForm } from './account-change-password.interface'

interface IProps {}

const AccountChangePasswordFormComponent: FC<Readonly<IProps>> = () => {
  const t = useTranslations('profile.accountChangePassword')

  const { mutateAsync: changePassword, isPending: isChangingPassword } = useMutation(
    changePasswordOnServerMutationOptions(),
  )

  const router = useRouter()

  const form = useForm<IAccountChangePasswordForm>({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      revokeOtherSessions: false,
    },
    resolver: zodResolver(AccountChangePasswordFormSchema),
  })

  const onSubmit = async (data: IAccountChangePasswordForm) => {
    const result = await changePassword({
      password: data.currentPassword,

      newPassword: data.newPassword,

      revokeOtherSessions: data.revokeOtherSessions,
    })

    if (!result?.success || result.error) {
      return toast.error(result?.error?.message || 'Failed to change password')
    }

    toast.success('Password changed successfully')

    router.refresh()

    form.reset()
  }

  return (
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
  )
}

export default AccountChangePasswordFormComponent
