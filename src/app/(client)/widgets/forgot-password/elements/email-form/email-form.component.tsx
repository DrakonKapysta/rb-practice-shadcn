'use client'

import { FC } from 'react'
import { EmailFormSchema, IEmailForm } from '../../forgot-password.interface'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Button,
  FieldGroup,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@/app/(client)/shared/ui'
import { requestResetPasswordMutationOptions } from '@/app/(client)/entities/api'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useTranslations } from 'next-intl'
import { Link } from '@/pkg/libraries/locale'

interface IProps {
  steps: string[]
  tips: string[]
}

const EmailFormComponent: FC<IProps> = (props) => {
  const { steps, tips } = props

  const t = useTranslations('forgotPassword')

  const { mutateAsync: requestResetPassword, isPending } = useMutation(requestResetPasswordMutationOptions())

  const form = useForm<IEmailForm>({
    defaultValues: {
      email: '',
    },

    resolver: zodResolver(EmailFormSchema),
  })

  const onSubmit = (data: IEmailForm) => {
    requestResetPassword({
      email: data.email,
      redirectTo: '/forgot-password',

      successCallback: () => {
        toast.success(
          'Reset password email sent.',

          {
            description: "If you don't see it, check your spam folder or verify your email address is correct.",
          },
        )
      },

      errorCallback: (error) => {
        toast.error(error.error.message || 'An error occurred while sending the reset password email')
      },
    })
  }

  return (
    <div className='flex w-full max-w-4xl flex-col gap-10'>
      <header className='space-y-4 text-center'>
        <h1 className='text-3xl font-semibold tracking-tight sm:text-4xl'>{t('title')}</h1>

        <p className='text-muted-foreground text-base sm:text-lg'>{t('description')}</p>
      </header>

      <div className='grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]'>
        <section className='bg-card rounded-lg border p-6 shadow-sm'>
          <div className='space-y-6'>
            <div className='space-y-2'>
              <h2 className='text-lg leading-none font-semibold tracking-tight'>{t('form.title')}</h2>

              <p className='text-muted-foreground text-sm'>{t('form.helper')}</p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
                <FieldGroup>
                  <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{'Email'}</FormLabel>

                        <FormControl>
                          <Input placeholder={'example@email.com'} {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </FieldGroup>

                <Button className='w-full' type='submit' disabled={isPending}>
                  {'Submit'}
                </Button>
              </form>
            </Form>
            <div className='text-muted-foreground text-sm'>
              <Link className='text-primary font-medium hover:underline' href={`/login`}>
                {t('backToLogin')}
              </Link>
            </div>
          </div>
        </section>

        <section className='space-y-6'>
          <div className='bg-card rounded-lg border p-6 shadow-sm'>
            <h2 className='text-lg leading-none font-semibold tracking-tight'>{t('steps.title')}</h2>

            <ol className='text-muted-foreground mt-4 space-y-3 text-sm [counter-reset:step]'>
              {steps.map((step, index) => (
                <li key={index} className='flex gap-3'>
                  <span className='bg-primary text-primary-foreground mt-1 flex h-5 w-5 items-center justify-center rounded-full text-xs font-semibold'>
                    {index + 1}
                  </span>

                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className='bg-card rounded-lg border p-6 shadow-sm'>
            <h2 className='text-lg leading-none font-semibold tracking-tight'>{t('tips.title')}</h2>

            <ul className='text-muted-foreground mt-4 space-y-3 text-sm'>
              {tips.map((tip, index) => (
                <li key={index} className='flex gap-3'>
                  <span className='bg-primary mt-1 h-2 w-2 rounded-full' aria-hidden />

                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  )
}

export default EmailFormComponent
