'use client'
import { useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import * as qs from 'qs-esm'
import { FC } from 'react'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/app/(client)/shared/ui'
import { useRouter } from '@/pkg/libraries/locale'

import { CharacterSearchSchema, ICharacterSearch } from './character-search.interface'

interface IProps {}

const CharacterSearchComponent: FC<Readonly<IProps>> = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const t = useTranslations('characterSearch')

  const filters = qs.parse(searchParams.toString()) as ICharacterSearch

  const form = useForm<ICharacterSearch>({
    defaultValues: {
      name: filters?.name || '',
      status: filters?.status || '',
      species: filters?.species || '',
      gender: filters?.gender || '',
    },
    resolver: zodResolver(CharacterSearchSchema),
  })

  const onSubmit = async (data: ICharacterSearch) => {
    const searchParams = new URLSearchParams()
    for (const [key, value] of Object.entries(data)) {
      if (value) {
        searchParams.set(key, value)
      }
    }

    router.push(`/?${searchParams.toString()}`)
  }

  const handleClear = () => {
    form.reset()
    router.push('/')
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 px-6'>
        <div className='flex flex-col gap-8 md:flex-row md:items-center'>
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
            name='status'
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor='status'>{t('status')}</FormLabel>

                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className='w-[180px]' id='status'>
                      <SelectValue placeholder={t('statusPlaceholder')} />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>{t('status')}</SelectLabel>

                        <SelectItem value='alive'>{t('statusOptions.alive')}</SelectItem>

                        <SelectItem value='dead'>{t('statusOptions.dead')}</SelectItem>

                        <SelectItem value='unknown'>{t('statusOptions.unknown')}</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='species'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('species')}</FormLabel>

                <FormControl>
                  <Input placeholder={t('speciesPlaceholder')} {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='gender'
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor='gender'>{t('gender')}</FormLabel>

                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className='w-[180px]' id='gender'>
                      <SelectValue placeholder={t('genderPlaceholder')} />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>{t('gender')}</SelectLabel>

                        <SelectItem value='Female'>{t('genderOptions.female')}</SelectItem>

                        <SelectItem value='Male'>{t('genderOptions.male')}</SelectItem>

                        <SelectItem value='Genderless'>{t('genderOptions.genderless')}</SelectItem>

                        <SelectItem value='unknown'>{t('genderOptions.unknown')}</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='flex gap-2'>
          <Button type='submit'>{t('searchButton')}</Button>

          <Button type='button' variant='outline' onClick={handleClear}>
            {t('clearButton')}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default CharacterSearchComponent
