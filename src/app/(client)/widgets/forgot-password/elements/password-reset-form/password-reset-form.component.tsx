'use client'

import { useTranslations } from 'next-intl'
import { type FC } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'

import { resetPasswordMutationOptions } from '@/app/(client)/entities/api'
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  FieldGroup,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  PasswordField,
  Separator,
  Spinner,
} from '@/app/(client)/shared/ui'
import { useRouter } from '@/pkg/libraries/locale'

import { type IPasswordResetForm, PasswordResetFormSchema } from '../../forgot-password.interface'

interface IProps {
  token: string | string[] | undefined
}
const PasswordResetFormComponent: FC<Readonly<IProps>> = (props) => {
  const { token } = props

  const tokenString = Array.isArray(token) ? token[0] : token

  const t = useTranslations('forgotPassword.reset')

  const router = useRouter()

  const { mutateAsync: resetPassword, isPending } = useMutation(resetPasswordMutationOptions())

  const reminderItems = [t('reminders.items.manager'), t('reminders.items.devices'), t('reminders.items.support')]

  const form = useForm<IPasswordResetForm>({
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
    resolver: zodResolver(PasswordResetFormSchema),
  })

  const onSubmit = async (data: IPasswordResetForm) => {
    if (!tokenString) {
      return toast.error(t('token.missing'))
    }

    await resetPassword({
      password: data.password,
      token: tokenString as string,

      successCallback: () => {
        toast.success(t('success'))

        router.push('/login')
      },

      errorCallback: (error) => {
        toast.error(error.error.message || t('errors.generic'))
      },
    })
  }

  return (
    <div className='mx-auto flex w-full max-w-4xl flex-col gap-8 py-6'>
      <header className='space-y-3 text-center'>
        <h1 className='text-3xl font-semibold tracking-tight sm:text-4xl'>{t('title')}</h1>
        <p className='text-muted-foreground text-base sm:text-lg'>{t('description')}</p>
        <p className='text-muted-foreground text-sm'>{t('warning')}</p>
      </header>

      <div className='grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]'>
        <Card className='h-full'>
          <CardHeader className='items-start gap-3'>
            <div className='space-y-1'>
              <Badge variant={tokenString ? 'secondary' : 'destructive'}>
                {tokenString ? t('token.valid') : t('token.missing')}
              </Badge>

              <CardTitle className='text-xl leading-tight'>{t('form.title')}</CardTitle>

              <CardDescription>{t('form.description')}</CardDescription>
            </div>
          </CardHeader>

          <Separator />

          <CardContent className='space-y-6 pt-6'>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
                <FieldGroup>
                  <FormField
                    control={form.control}
                    name='password'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>

                        <FormControl>
                          <PasswordField id='password' placeholder='Password' {...field} />
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
                        <FormLabel>Confirm Password</FormLabel>

                        <FormControl>
                          <PasswordField id='confirmPassword' placeholder='Confirm Password' {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </FieldGroup>

                <Button type='submit' className='w-full' disabled={isPending}>
                  {isPending ? <Spinner className='h-4 w-4' /> : 'Reset Password'}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <div className='flex flex-col gap-6'>
          <Card>
            <CardHeader>
              <CardTitle>{t('reminders.title')}</CardTitle>

              <CardDescription>{t('warning')}</CardDescription>
            </CardHeader>

            <CardContent>
              <ul className='text-muted-foreground space-y-3 text-sm'>
                {reminderItems.map((item, index) => (
                  <li key={index} className='flex gap-3'>
                    <span className='bg-primary mt-1 h-2 w-2 rounded-full' aria-hidden />

                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default PasswordResetFormComponent
