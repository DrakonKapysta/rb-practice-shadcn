'use client'
import { FC, useTransition } from 'react'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'

import { loginMutationOptions } from '@/app/(client)/entities/api'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Spinner } from '@/app/(client)/shared/ui'
import { Button } from '@/app/(client)/shared/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/(client)/shared/ui/card'
import { Field, FieldDescription, FieldGroup } from '@/app/(client)/shared/ui/field'
import { Input } from '@/app/(client)/shared/ui/input'
import { Link, useRouter } from '@/pkg/libraries/locale'
import { loggerUtil } from '@/pkg/utils/logger'
import { cn } from '@/pkg/utils/ui'

import { ILoginForm, LoginFormSchema } from './login-form.interface'

interface IProps extends React.ComponentProps<typeof Card> {}
const LoginFormComponent: FC<Readonly<IProps>> = (props) => {
  const { className, ...rest } = props
  const { mutateAsync: login, isPending } = useMutation(loginMutationOptions())

  const [isSubmitting, startTransition] = useTransition()

  const router = useRouter()

  const form = useForm<ILoginForm>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(LoginFormSchema),
  })

  const onSubmit = async (data: ILoginForm) => {
    startTransition(async () => {
      try {
        const response = await login(data)
        if (response.success) {
          router.push('/')
        }
      } catch (error) {
        loggerUtil({ text: 'LoginFormComponent', value: (error as Error).message, level: 'error' })
      }
    })
  }

  return (
    <div className={cn('flex w-full max-w-sm flex-col gap-6', className)} {...rest}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>

          <CardDescription>Enter your email below to login to your account</CardDescription>
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
                      <FormLabel>Email</FormLabel>

                      <FormControl>
                        <Input placeholder='Email' {...field} />
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
                      <FormLabel>Password</FormLabel>

                      <FormControl>
                        <Input placeholder='Password' {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Field>
                  <Button type='submit' disabled={isPending || isSubmitting}>
                    {isPending ? <Spinner /> : 'Login'}
                  </Button>

                  <Button variant='outline' type='button'>
                    Login with Google
                  </Button>

                  <FieldDescription className='text-center'>
                    Don&apos;t have an account? <Link href='/register'>Sign up</Link>
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
