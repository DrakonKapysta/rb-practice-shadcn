'use client'

import { ErrorContext } from 'better-auth/react'
import { useTranslations } from 'next-intl'
import { FC, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'

import { registerMutationOptions } from '@/app/(client)/entities/api'
import {
  Button,
  Card,
  CardContent,
  CardDescription,
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
    <Card className={cn('flex w-full max-w-sm flex-col gap-6', className)} {...rest}>
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
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('name')}</FormLabel>

                    <FormControl>
                      <Input placeholder={t('namePlaceholder')} {...field} />
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
                    <FormLabel>{t('email')}</FormLabel>

                    <FormControl>
                      <Input placeholder={t('emailPlaceholder')} {...field} />
                    </FormControl>

                    <FieldDescription>{t('emailDescription')}</FieldDescription>

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

              <FormField
                control={form.control}
                name='confirmPassword'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('confirmPassword')}</FormLabel>

                    <FormControl>
                      <Input type='password' placeholder={t('confirmPasswordPlaceholder')} {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FieldGroup>
                <Field>
                  <Button type='submit' disabled={isRegisterProcessing}>
                    {isRegisterProcessing ? <Spinner /> : t('createAccountButton')}
                  </Button>

                  <Button variant='outline' type='button' disabled={true}>
                    {t('googleSignUpButton')}
                  </Button>

                  <FieldDescription className='px-6 text-center'>
                    {t('hasAccount')} <Link href='/login'>{t('signIn')}</Link>
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </FieldGroup>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default RegisterFormComponent
