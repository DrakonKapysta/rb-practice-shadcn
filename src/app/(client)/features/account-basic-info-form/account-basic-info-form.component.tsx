'use client'

import { format } from 'date-fns'
import { CalendarIcon, Mail, MapPin, Phone, User } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { FC } from 'react'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import {
  Button,
  Calendar,
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
} from '@/app/(client)/shared/ui'
import { Session } from '@/pkg/integrations/better-auth'

import { AccountBasicInfoFormSchema, IAccountBasicInfoForm } from './account-basic-info-form.interface'
import { AccountBasicInfoFormService } from './accout-basic-info-form.service'

interface IProps {
  defaultValues?: Session['user']
}

const AccountBasicInfoFormComponent: FC<Readonly<IProps>> = (props) => {
  const { defaultValues } = props

  const t = useTranslations('profile')

  const form = useForm<IAccountBasicInfoForm>({
    defaultValues: {
      email: defaultValues?.email ?? '',
      name: defaultValues?.name ?? '',
      surname: defaultValues?.surname ?? '',
      phoneNumber: defaultValues?.phoneNumber ?? '',
      address: defaultValues?.address ?? '',
      country: defaultValues?.country ?? '',
      gender: defaultValues?.gender ?? '',
      birthDate: defaultValues?.birthDate ? new Date(defaultValues.birthDate) : undefined,
    },
    resolver: zodResolver(AccountBasicInfoFormSchema),
  })

  const onSubmit = async (data: IAccountBasicInfoForm) => {
    const normalizedData = AccountBasicInfoFormService.normalizeEmptyToNull(data)
    // console.log(normalizedData)
  }

  return (
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
                        <Select onValueChange={field.onChange} value={field?.value}>
                          <SelectTrigger id='gender'>
                            <SelectValue placeholder={t('accountBasicInfo.genderPlaceholder')}>
                              {field.value
                                ? t(`accountBasicInfo.gender${field.value?.[0].toUpperCase() + field.value?.slice(1)}`)
                                : t('accountBasicInfo.genderPlaceholder')}
                            </SelectValue>
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
                <FormField
                  control={form.control}
                  name='phoneNumber'
                  render={({ field }) => (
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
  )
}

export default AccountBasicInfoFormComponent
