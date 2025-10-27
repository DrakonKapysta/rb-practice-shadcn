'use client'

import { useTranslations } from 'next-intl'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'

import { createCommentMutationOptions } from '@/app/(client)/entities/api'
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Textarea,
} from '@/app/(client)/shared/ui'

import { CreateCommentFormSchema, ICreateCommentForm } from './character-comment-form.interface'

interface IProps {
  characterId: number
}

const CharacterCommentFormComponent: FC<Readonly<IProps>> = (props) => {
  const { characterId } = props

  const { mutateAsync: createComment, isPending, error } = useMutation(createCommentMutationOptions())

  const t = useTranslations('characterDetail.commentForm')

  const form = useForm<ICreateCommentForm>({
    defaultValues: {
      content: '',

      characterId,
    },

    resolver: zodResolver(CreateCommentFormSchema),
  })

  const onSubmit = async (data: ICreateCommentForm) => {
    const result = await createComment(data)

    if (!result.success || error) {
      toast.error(result.error?.message || 'An error occurred while creating the comment')
      return
    }
    console.log(result)
    toast.success('Comment created successfully')
    form.reset()
  }

  const isCommentSending = form.formState.isSubmitting || isPending

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='border-default-200 flex flex-col gap-4 rounded-xl border p-4 shadow-md'
      >
        <FormField
          control={form.control}
          name='content'
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>{t('content')}</FormLabel>

                <FormControl>
                  <Textarea className='resize-none' placeholder={t('contentPlaceholder')} {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )
          }}
        />

        <div className='flex gap-2'>
          <Button color='primary' type='submit' disabled={isCommentSending}>
            {t('submitButton')}
          </Button>

          <Button
            color='primary'
            variant='outline'
            type='reset'
            onClick={() => form.reset()}
            disabled={isCommentSending}
          >
            {t('clearButton')}
          </Button>
        </div>
      </form>
    </Form>
  )
}
export default CharacterCommentFormComponent
