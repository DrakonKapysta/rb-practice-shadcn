'use client'

import { FC, useTransition } from 'react'
import { useForm } from 'react-hook-form'

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
import { loggerUtil } from '@/pkg/utils/logger'
import { cn } from '@/pkg/utils/ui'

import { IRegisterForm, RegisterFormSchema } from './register-form.interface'

interface IProps extends React.ComponentProps<typeof Card> {}
const RegisterFormComponent: FC<Readonly<IProps>> = (props) => {
  const { className, ...rest } = props

  const { mutateAsync: register, isPending } = useMutation(registerMutationOptions())

  const [isSubmitting, startTransition] = useTransition()

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

  const onSubmit = (data: IRegisterForm) => {
    startTransition(async () => {
      try {
        const response = await register(data)
        if (response.success) {
          router.push('/')
        }
      } catch (error) {
        loggerUtil({ text: 'RegisterFormComponent', value: (error as Error).message, level: 'error' })
      }
    })
  }
  return (
    <Card className={cn('flex w-full max-w-sm flex-col gap-6', className)} {...rest}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>

        <CardDescription>Enter your information below to create your account</CardDescription>
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
                    <FormLabel>Name</FormLabel>

                    <FormControl>
                      <Input placeholder='Name' {...field} />
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
                    <FormLabel>Email</FormLabel>

                    <FormControl>
                      <Input placeholder='Email' {...field} />
                    </FormControl>

                    <FieldDescription>
                      We&apos;ll use this to contact you. We will not share your email with anyone else.
                    </FieldDescription>

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

              <FormField
                control={form.control}
                name='confirmPassword'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>

                    <FormControl>
                      <Input placeholder='Confirm Password' {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FieldGroup>
                <Field>
                  <Button type='submit' disabled={isPending || isSubmitting}>
                    {isPending ? <Spinner /> : 'Create Account'}
                  </Button>

                  <Button variant='outline' type='button'>
                    Sign up with Google
                  </Button>

                  <FieldDescription className='px-6 text-center'>
                    Already have an account? <Link href='/login'>Sign in</Link>
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
