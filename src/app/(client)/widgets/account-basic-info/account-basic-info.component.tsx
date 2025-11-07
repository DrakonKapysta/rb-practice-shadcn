'use client'

import { format } from 'date-fns'
import { CalendarIcon, Mail, MapPin, Phone, User } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { FC, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'

import { updateUserMutationOptions } from '@/app/(client)/entities/api'
import {
  Button,
  Calendar,
  Card,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Spinner,
} from '@/app/(client)/shared/ui'
import { authClient } from '@/pkg/integrations/better-auth/auth-client'

import { AccountBasicInfoSchema, IAccountBasicInfo } from './account-basic-info.interface'
import { AccountBasicInfoService } from './accout-basic-info.service'

interface IProps {}

const AccountBasicInfoComponent: FC<Readonly<IProps>> = () => {
  const t = useTranslations('profile')

  const { data: session, refetch } = authClient.useSession()

  const [isLoading, setIsLoading] = useState(true)

  const { mutateAsync: updateUser } = useMutation(updateUserMutationOptions())

  const form = useForm<IAccountBasicInfo>({
    defaultValues: {
      name: '',
      surname: '',
      phoneNumber: '',
      address: '',
      country: '',
      gender: '',
      birthDate: undefined,
    },
    resolver: zodResolver(AccountBasicInfoSchema),
  })

  useEffect(() => {
    if (session?.user) {
      form.reset({
        ...form.getValues(),
        name: session.user.name ?? '',
        surname: session.user.surname ?? '',
        phoneNumber: session.user.phoneNumber ?? '',
        address: session.user.address ?? '',
        country: session.user.country ?? '',
        gender: session.user.gender ?? '',
        birthDate: session.user.birthDate ? new Date(session.user.birthDate) : undefined,
      })

      setIsLoading(false)
    }
  }, [session, form])

  const onSubmit = async (data: IAccountBasicInfo) => {
    const normalizedData = AccountBasicInfoService.normalizeEmptyToNull(data)

    await updateUser({
      ...normalizedData,

      successCallback: () => {
        toast.success('User updated successfully')

        refetch()
      },

      errorCallback: (error) => {
        toast.error(error.error.message || 'An error occurred while updating the user')
      },
    })
  }

  if (isLoading) {
    return (
      <div className='flex flex-1 items-center justify-center'>
        <Spinner className='mx-auto h-10 w-10 flex-1 items-center' />
      </div>
    )
  }

  return (
    <div className='mx-auto max-w-5xl p-6'>
      <Card className='bg-card border p-8'>
        <div className='border-b pb-6'>
          <h2 className='text-2xl font-semibold tracking-tight'>{t('accountBasicInfo.title')}</h2>

          <p className='text-muted-foreground mt-2 text-sm'>{t('accountBasicInfo.description')}</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <div className='space-y-6'>
              <div>
                <h3 className='mb-4 text-sm font-medium'>{t('accountBasicInfo.basicDetails')}</h3>

                <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                  <div className='space-y-2'>
                    <FormField
                      control={form.control}
                      name='name'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className='flex items-center gap-2'>
                            <User className='text-muted-foreground h-4 w-4' />
                            {t('accountBasicInfo.name')}
                          </FormLabel>

                          <FormControl>
                            <Input id='name' placeholder='Emma' {...field} />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className='space-y-2'>
                    <FormField
                      control={form.control}
                      name='surname'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className='flex items-center gap-2'>
                            <User className='text-muted-foreground h-4 w-4' />
                            {t('accountBasicInfo.surname')}
                          </FormLabel>

                          <FormControl>
                            <Input id='surname' placeholder='Roberts' {...field} />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className='mb-4 text-sm font-medium'>{t('accountBasicInfo.professionalInformation')}</h3>

                <div className='flex flex-col gap-6 sm:flex-row sm:items-end'>
                  <div className='flex flex-col gap-2'>
                    <FormField
                      control={form.control}
                      name='gender'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className='flex items-center gap-2'>
                            <User className='text-muted-foreground h-4 w-4' />
                            {t('accountBasicInfo.gender')}
                          </FormLabel>

                          <FormControl>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <SelectTrigger id='gender'>
                                <SelectValue placeholder={t('accountBasicInfo.genderPlaceholder')} />
                              </SelectTrigger>

                              <SelectContent>
                                <SelectItem value='male'>{t('accountBasicInfo.genderMale')}</SelectItem>

                                <SelectItem value='female'>{t('accountBasicInfo.genderFemale')}</SelectItem>

                                <SelectItem value='other'>{t('accountBasicInfo.genderOther')}</SelectItem>

                                <SelectItem value='prefer-not-to-say'>
                                  {t('accountBasicInfo.genderPreferNotToSay')}
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className='flex flex-col gap-2'>
                    <FormField
                      control={form.control}
                      name='birthDate'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className='flex items-center gap-2'>
                            <CalendarIcon className='text-muted-foreground h-4 w-4' />
                            {t('accountBasicInfo.birthDate')}
                          </FormLabel>

                          <FormControl>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button variant='outline' className='w-full justify-start text-left font-normal'>
                                  <CalendarIcon className='mr-2 h-4 w-4' />

                                  {field.value
                                    ? format(field.value, 'MMM dd, yyyy')
                                    : t('accountBasicInfo.birthDatePlaceholder')}
                                </Button>
                              </PopoverTrigger>

                              <PopoverContent className='w-auto p-0' align='start'>
                                <Calendar {...field} mode='single' selected={field.value} onSelect={field.onChange} />
                              </PopoverContent>
                            </Popover>
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className='mb-4 text-sm font-medium'>{t('accountBasicInfo.contactInformation')}</h3>

                <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                  <div className='space-y-2'>
                    <FormItem>
                      <FormLabel className='flex items-center gap-2'>
                        <Mail className='text-muted-foreground h-4 w-4' />
                        {t('accountBasicInfo.email')}
                      </FormLabel>

                      <FormControl>
                        <Input
                          id='email'
                          type='email'
                          placeholder={t('accountBasicInfo.emailPlaceholder')}
                          disabled
                          defaultValue={session?.user?.email}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  </div>

                  <div className='space-y-2'>
                    <FormField
                      control={form.control}
                      name='phoneNumber'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className='flex items-center gap-2'>
                            <Phone className='text-muted-foreground h-4 w-4' />
                            {t('accountBasicInfo.phoneNumber')}
                          </FormLabel>

                          <FormControl>
                            <Input
                              id='phoneNumber'
                              type='tel'
                              placeholder={t('accountBasicInfo.phoneNumberPlaceholder')}
                              {...field}
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className='space-y-2'>
                    <FormField
                      control={form.control}
                      name='address'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className='flex items-center gap-2'>
                            <MapPin className='text-muted-foreground h-4 w-4' />
                            {t('accountBasicInfo.address')}
                          </FormLabel>

                          <FormControl>
                            <Input id='address' placeholder={t('accountBasicInfo.addressPlaceholder')} {...field} />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className='flex justify-end gap-3 border-t pt-6'>
              <Button type='submit'>{t('accountBasicInfo.saveChanges')}</Button>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  )
}

export default AccountBasicInfoComponent
