'use client'
import { useSearchParams } from 'next/navigation'
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
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <div className='flex flex-col gap-8 md:flex-row md:items-center'>
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
            name='status'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>

                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className='w-[180px]'>
                      <SelectValue placeholder='Status' />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Status</SelectLabel>

                        <SelectItem value='alive'>Alive</SelectItem>

                        <SelectItem value='dead'>Dead</SelectItem>

                        <SelectItem value='unknown'>unknown</SelectItem>
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
                <FormLabel>Species</FormLabel>

                <FormControl>
                  <Input placeholder='Species' {...field} />
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
                <FormLabel>Gender</FormLabel>

                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className='w-[180px]'>
                      <SelectValue placeholder='Gender' />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Gender</SelectLabel>

                        <SelectItem value='Female'>Female</SelectItem>

                        <SelectItem value='Male'>Male</SelectItem>

                        <SelectItem value='Genderless'>Genderless</SelectItem>

                        <SelectItem value='unknown'>unknown</SelectItem>
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
          <Button type='submit'>Search</Button>

          <Button type='button' variant='outline' onClick={handleClear}>
            Clear
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default CharacterSearchComponent
