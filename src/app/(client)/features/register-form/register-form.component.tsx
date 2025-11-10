'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { ErrorContext } from 'better-auth/react'
import { CheckCircle2 } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { FC, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { registerMutationOptions } from '@/app/(client)/entities/api'
import { GoogleIcon } from '@/app/(client)/shared/assets'
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Field,
  FieldDescription,
  FieldGroup,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  PasswordField,
  Separator,
  Spinner,
} from '@/app/(client)/shared/ui'
import { Link, useRouter } from '@/pkg/libraries/locale'
import { cn } from '@/pkg/utils/ui'
import { IRegisterForm, RegisterFormSchema } from './register-form.interface'

interface IProps extends React.ComponentProps<typeof Card> {}
const RegisterFormComponent: FC<Readonly<IProps>> = (props) => {
  const { className, ...rest } = props

  const t = useTranslations('registerForm')

  const { mutateAsync: register, isPending } = useMutation(registerMutationOptions())

  const [isTransition, startTransition] = useTransition()

  const router = useRouter()

  const form = useForm<IRegisterForm>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    resolver: zodResolver(RegisterFormSchema),
  })

  const onSubmit = async (data: IRegisterForm) => {
    await register({
      credentials: {
        email: data.email,
        password: data.password,
        name: data.name,
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

  const isRegisterProcessing = isPending || isTransition

  return (
    <div
      className={cn(
        'border-border/50 bg-background/70 shadow-primary/5 ring-border/60 relative flex w-full max-w-2xl flex-col gap-6 rounded-3xl border p-1 shadow-xl ring-1 backdrop-blur',
        className,
      )}
      {...rest}
    >
      <div className='pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[26px]'>
        <div className='bg-primary/10 absolute top-16 -left-20 h-56 w-56 rounded-full blur-3xl' />
        <div className='bg-secondary/50 absolute -right-24 bottom-8 h-44 w-44 rounded-full blur-3xl' />
      </div>

      <Card className='border-none bg-transparent shadow-none'>
        <CardHeader className='space-y-6'>
          <div className='flex flex-col gap-3 text-center'>
            <Badge variant='outline' className='border-primary/30 bg-primary/10 text-primary mx-auto w-fit'>
              {t('welcomeBadge')}
            </Badge>

            <div className='space-y-2'>
              <CardTitle className='text-2xl font-semibold tracking-tight text-balance sm:text-3xl'>
                {t('title')}
              </CardTitle>

              <CardDescription className='text-muted-foreground text-base'>{t('description')}</CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className='space-y-6'>
          <Form {...form}>
            <form className='space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
              <FieldGroup className='space-y-6'>
                <div className='grid items-start gap-4 sm:grid-cols-2'>
                  <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-foreground text-sm font-medium'>{t('name')}</FormLabel>

                        <FormControl>
                          <Input className='h-11' placeholder={t('namePlaceholder')} {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-foreground text-sm font-medium'>{t('email')}</FormLabel>

                        <FormControl>
                          <Input className='h-11' placeholder={t('emailPlaceholder')} {...field} />
                        </FormControl>

                        <FieldDescription className='text-muted-foreground text-xs'>
                          {t('emailDescription')}
                        </FieldDescription>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className='grid items-start gap-4 sm:grid-cols-2'>
                  <FormField
                    control={form.control}
                    name='password'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-foreground text-sm font-medium'>{t('password')}</FormLabel>

                        <FormControl>
                          <PasswordField
                            {...field}
                            id='password'
                            className='h-11'
                            placeholder={t('passwordPlaceholder')}
                          />
                        </FormControl>

                        <FieldDescription className='text-muted-foreground text-xs'>
                          {t('passwordHelper')}
                        </FieldDescription>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='confirmPassword'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-foreground text-sm font-medium'>{t('confirmPassword')}</FormLabel>

                        <FormControl>
                          <Input
                            className='h-11'
                            placeholder={t('confirmPasswordPlaceholder')}
                            type='password'
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Field className='space-y-2'>
                  <Button className='h-11 text-base font-semibold' type='submit' disabled={isRegisterProcessing}>
                    {isRegisterProcessing ? <Spinner /> : t('createAccountButton')}
                  </Button>
                </Field>
              </FieldGroup>
            </form>
          </Form>
        </CardContent>

        <CardFooter className='flex flex-col gap-4'>
          <FieldDescription className='text-foreground text-center text-sm'>
            {t('hasAccount')}{' '}
            <Link className='text-primary hover:text-primary/80 font-semibold' href='/login'>
              {t('signIn')}
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

export default RegisterFormComponent
