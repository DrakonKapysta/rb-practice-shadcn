'use client'

import { useTranslations } from 'next-intl'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'

import { updateCommentMutationOptions } from '@/app/(client)/entities/api'
import {
  Button,
  Field,
  FieldGroup,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Textarea,
} from '@/app/(client)/shared/ui'

import { IUpdateCommentForm, UpdateCommentFormSchema } from './update-comment.interface'

interface IProps {
  commentId: number
  comment: string
  characterId: number
  onCancel: () => void
}

const UpdateCommentComponent: FC<Readonly<IProps>> = (props) => {
  const { commentId, comment, characterId, onCancel } = props

  const t = useTranslations('common')

  const {
    mutateAsync: updateComment,
    isPending: isUpdatingComment,
    error: updateCommentError,
  } = useMutation(updateCommentMutationOptions())

  const form = useForm<IUpdateCommentForm>({
    defaultValues: {
      commentId,

      comment,
    },
    resolver: zodResolver(UpdateCommentFormSchema),
  })

  const onSubmit = async (data: IUpdateCommentForm) => {
    const result = await updateComment({
      commentId: commentId,
      comment: { content: data.comment, characterId: characterId },
    })

    if (!result.success || updateCommentError) {
      return toast.error(result.error?.message || 'An error occurred while updating the comment')
    }

    toast.success('Comment updated successfully')

    onCancel()

    form.reset()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <FormField
            control={form.control}
            name='comment'
            render={({ field }) => {
              return (
                <FormItem>
                  <FormControl>
                    <Textarea className='resize-none' {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )
            }}
          />

          <Field>
            <div className='flex items-center gap-2'>
              <Button disabled={isUpdatingComment} type='submit' variant='default' size='sm'>
                {t('save')}
              </Button>

              <Button disabled={isUpdatingComment} onClick={onCancel} variant='destructive' size='sm'>
                {t('cancel')}
              </Button>
            </div>
          </Field>
        </FieldGroup>
      </form>
    </Form>
  )
}

export default UpdateCommentComponent
