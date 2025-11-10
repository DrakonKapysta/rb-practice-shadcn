'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { ErrorContext } from 'better-auth/react'
import { CheckCircle2 } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { FC, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { googleLoginMutationOptions, loginMutationOptions } from '@/app/(client)/entities/api'
import { GoogleIcon } from '@/app/(client)/shared/assets'
import {
  Badge,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Separator,
  Spinner,
} from '@/app/(client)/shared/ui'
import { Button } from '@/app/(client)/shared/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/app/(client)/shared/ui/card'
import { Field, FieldDescription, FieldGroup } from '@/app/(client)/shared/ui/field'
import { Input } from '@/app/(client)/shared/ui/input/input.component'
import { Link, useRouter } from '@/pkg/libraries/locale'
import { cn } from '@/pkg/utils/ui'

import { ILoginForm, LoginFormSchema } from './login-form.interface'

interface IProps extends React.ComponentProps<typeof Card> {}
const LoginFormComponent: FC<Readonly<IProps>> = (props) => {
  const { className, ...rest } = props

  const { mutateAsync: login, isPending } = useMutation(loginMutationOptions())
  const { mutateAsync: googleLogin, isPending: isGoogleLoginPending } = useMutation(googleLoginMutationOptions())

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

  const highlightItems = ['security', 'sync', 'support'] as const

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

  const handleGoogleLogin = async () => {
    await googleLogin({
      successCallback: () => {
        router.push('/')

        router.refresh()
      },

      errorCallback: (error: ErrorContext) => {
        toast.error(error.error.message || t('errors.generic'))
      },
    })
  }

  const isLoginProcessing = isPending || isTransition

  return (
    <div
      className={cn(
        'border-border/50 bg-background/70 shadow-primary/5 ring-border/60 relative flex w-full max-w-xl flex-col gap-6 rounded-3xl border p-1 shadow-xl ring-1 backdrop-blur',
        className,
      )}
      {...rest}
    >
      <div className='pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[26px]'>
        <div className='bg-primary/10 absolute top-12 -left-24 h-56 w-56 rounded-full blur-3xl' />
        <div className='bg-muted/60 absolute -right-16 bottom-6 h-48 w-48 rounded-full blur-3xl' />
      </div>

      <Card className='border-none bg-transparent shadow-none'>
        <CardHeader className='space-y-6'>
          <div className='flex flex-col gap-3 text-center'>
            <Badge variant='outline' className='border-primary/30 bg-primary/10 text-primary mx-auto w-fit'>
              {t('welcomeBadge')}
            </Badge>

            <div className='space-y-2'>
              <CardTitle className='text-2xl font-semibold tracking-tight sm:text-3xl'>{t('title')}</CardTitle>

              <CardDescription className='text-muted-foreground text-base'>{t('description')}</CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className='space-y-6'>
          <Form {...form}>
            <form className='space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
              <FieldGroup className='space-y-6'>
                <div className='grid gap-4 sm:grid-cols-2'>
                  <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-foreground text-sm font-medium'>{t('email')}</FormLabel>

                        <FormControl>
                          <Input className='h-11' placeholder={t('emailPlaceholder')} {...field} />
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
                        <FormLabel className='text-foreground text-sm font-medium'>{t('password')}</FormLabel>

                        <FormControl>
                          <Input className='h-11' placeholder={t('passwordPlaceholder')} type='password' {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className='flex items-center justify-between text-sm'>
                  <p className='text-muted-foreground text-xs'>{t('helper')}</p>

                  <Link
                    className='text-primary hover:text-primary/80 text-sm font-medium transition-colors'
                    href={'/forgot-password'}
                  >
                    {t('forgotPassword')}
                  </Link>
                </div>

                <Field className='space-y-4'>
                  <Button className='h-11 text-base font-semibold' type='submit' disabled={isLoginProcessing}>
                    {isLoginProcessing ? <Spinner /> : t('loginButton')}
                  </Button>

                  <div className='space-y-3'>
                    <div className='flex items-center gap-3'>
                      <Separator className='flex-1' />

                      <span className='text-muted-foreground text-xs tracking-wide uppercase'>{t('dividerLabel')}</span>

                      <Separator className='flex-1' />
                    </div>

                    <Button
                      variant='outline'
                      type='button'
                      className='border-border/80 bg-background/80 hover:bg-background h-11 w-full justify-center gap-2 border text-sm font-medium shadow-sm transition'
                      disabled={isGoogleLoginPending}
                      onClick={handleGoogleLogin}
                    >
                      <GoogleIcon className='h-5 w-5 fill-white' /> {t('googleLoginButton')}
                    </Button>
                  </div>
                </Field>
              </FieldGroup>
            </form>
          </Form>
        </CardContent>

        <CardFooter className='flex flex-col gap-4'>
          <FieldDescription className='text-foreground text-center text-sm'>
            {t('noAccount')}{' '}
            <Link className='text-primary hover:text-primary/80 font-semibold' href='/register'>
              {t('signUp')}
            </Link>
          </FieldDescription>

          <p className='text-muted-foreground text-center text-xs'>
            {t('legal.disclaimer')}{' '}
            <Link className='text-primary hover:text-primary/80 font-medium transition-colors' href='/terms'>
              {t('legal.terms')}
            </Link>{' '}
            ·{' '}
            <Link className='text-primary hover:text-primary/80 font-medium transition-colors' href='/privacy'>
              {t('legal.privacy')}
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

export default LoginFormComponent
