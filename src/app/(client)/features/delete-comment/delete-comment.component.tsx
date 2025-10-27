import { Trash2 } from 'lucide-react'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'

import { deleteCommentMutationOptions } from '@/app/(client)/entities/api'
import { Button, Field, Form } from '@/app/(client)/shared/ui'

import { DeleteCommentFormSchema, IDeleteCommentForm } from './delete-comment.interface'

interface IProps {
  commentId: number
  characterId: number
}

const DeleteCommentComponent: FC<Readonly<IProps>> = (props) => {
  const { commentId, characterId } = props

  const {
    mutateAsync: deleteComment,
    isPending: isDeletingComment,
    error: deleteCommentError,
  } = useMutation(deleteCommentMutationOptions())

  const form = useForm<IDeleteCommentForm>({
    defaultValues: {
      commentId,

      characterId,
    },
    resolver: zodResolver(DeleteCommentFormSchema),
  })

  const onSubmit = async () => {
    const result = await deleteComment({ commentId, characterId })

    if (!result.success || deleteCommentError) {
      return toast.error(result.error?.message || 'An error occurred while deleting the comment')
    }

    toast.success('Comment deleted successfully')
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Field>
          <Button disabled={isDeletingComment} variant='secondary' color='danger' size='sm' className='rounded-full'>
            <Trash2 className='h-6 w-6' />
          </Button>
        </Field>
      </form>
    </Form>
  )
}

export default DeleteCommentComponent
