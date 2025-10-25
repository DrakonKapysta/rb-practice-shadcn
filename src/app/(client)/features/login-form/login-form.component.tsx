'use client'
import { ErrorContext } from 'better-auth/react'
import { useTranslations } from 'next-intl'
import { FC, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'

import { loginMutationOptions } from '@/app/(client)/entities/api'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Spinner } from '@/app/(client)/shared/ui'
import { Button } from '@/app/(client)/shared/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/(client)/shared/ui/card'
import { Field, FieldDescription, FieldGroup } from '@/app/(client)/shared/ui/field'
import { Input } from '@/app/(client)/shared/ui/input/input'
import { Link, useRouter } from '@/pkg/libraries/locale'
import { cn } from '@/pkg/utils/ui'

import { ILoginForm, LoginFormSchema } from './login-form.interface'

interface IProps extends React.ComponentProps<typeof Card> {}
const LoginFormComponent: FC<Readonly<IProps>> = (props) => {
  const { className, ...rest } = props

  const { mutateAsync: login, isPending } = useMutation(loginMutationOptions())

  const [isTransition, startTransition] = useTransition()

  const router = useRouter()

  const t = useTranslations('loginForm')

  const form = useForm<ILoginForm>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(LoginFormSchema),
  })

  const onSubmit = async (data: ILoginForm) => {
    await login({
      credentials: {
        email: data.email,
        password: data.password,
      },

      successCallback: () => {
        startTransition(() => {
          router.push('/')

          router.refresh()
        })
      },

      errorCallback: (error: ErrorContext) => {
        toast.error(error.error.message || t('errors.generic'))
      },
    })
  }

  const isLoginProcessing = isPending || isTransition

  return (
    <div className={cn('flex w-full max-w-sm flex-col gap-6', className)} {...rest}>
      <Card>
        <CardHeader>
          <CardTitle>{t('title')}</CardTitle>

          <CardDescription>{t('description')}</CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FieldGroup>
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('email')}</FormLabel>

                      <FormControl>
                        <Input placeholder={t('emailPlaceholder')} {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('password')}</FormLabel>

                      <FormControl>
                        <Input type='password' placeholder={t('passwordPlaceholder')} {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Field>
                  <Button type='submit' disabled={isLoginProcessing}>
                    {isLoginProcessing ? <Spinner /> : t('loginButton')}
                  </Button>

                  <Button variant='outline' type='button' disabled={true}>
                    {t('googleLoginButton')}
                  </Button>

                  <FieldDescription className='text-center'>
                    {t('noAccount')} <Link href='/register'>{t('signUp')}</Link>
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

export default LoginFormComponent
