'use client'

import { Edit, MessageSquare, Save, Trash2, X } from 'lucide-react'
import { FC, useRef, useState } from 'react'
import { toast } from 'sonner'

import { useMutation, useQuery } from '@tanstack/react-query'

import {
  commentsByCharacterIdQueryOptions,
  deleteCommentMutationOptions,
  updateCommentMutationOptions,
} from '@/app/(client)/entities/api'
import { IComment } from '@/app/(client)/entities/models'
import { Button, Card, CardContent, CardHeader, StatusCardComponent, Textarea } from '@/app/(client)/shared/ui'
import { authClient } from '@/pkg/integrations/better-auth/auth-client'
import { cn } from '@/pkg/utils/ui'

interface IProps {
  characterId: number
}

const CharacterCommentFieldComponent: FC<Readonly<IProps>> = (props) => {
  const { characterId } = props

  const [deleteCommentId, setDeleteCommentId] = useState<number | null>(null)
  const [editCommentId, setEditCommentId] = useState<number | null>(null)

  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const { data: session } = authClient.useSession()

  const {
    data: comments,
    isLoading,
    error,
  } = useQuery(commentsByCharacterIdQueryOptions(characterId, { orderDirection: 'asc' }))

  const {
    mutateAsync: updateComment,
    isPending: isUpdatingComment,
    error: updateCommentError,
  } = useMutation(updateCommentMutationOptions())

  const {
    mutateAsync: deleteComment,
    isPending: isDeletingComment,
    error: deleteCommentError,
  } = useMutation(deleteCommentMutationOptions())

  const handleDeleteComment = async (commentId: number) => {
    setDeleteCommentId(commentId)

    const result = await deleteComment({ commentId, characterId })

    if (!result.success || deleteCommentError) {
      setDeleteCommentId(null)
      return toast.error(result.error?.message || 'An error occurred while deleting the comment')
    }

    toast.success('Comment deleted successfully')

    setDeleteCommentId(null)
  }

  const handleStartEditComment = (commentId: number) => {
    setEditCommentId(commentId)
  }

  const handleCancelEditComment = () => {
    setEditCommentId(null)
  }

  const isCommentOwner = (comment: IComment) => {
    return session?.user?.id && comment.userId === session.user.id
  }

  const handleSaveEditComment = async (comment: IComment) => {
    const result = await updateComment({
      commentId: comment.id,
      comment: { content: textareaRef.current?.value || comment.content, characterId: comment.characterId },
    })

    if (!result.success || updateCommentError) {
      setEditCommentId(null)
      return toast.error(result.error?.message || 'An error occurred while updating the comment')
    }

    toast.success('Comment updated successfully')

    setEditCommentId(null)
  }

  if (isLoading) {
    return <StatusCardComponent statusTitle='Comments' showLoader={true} />
  }

  if (error) {
    return <StatusCardComponent statusTitle='Comments' errorMessage='An error occurred while fetching comments.' />
  }

  if (!comments || comments.length === 0) {
    return <StatusCardComponent statusTitle='Comments' errorMessage='No comments yet' />
  }

  return (
    <Card className='text-secondary-500'>
      <CardHeader>
        <h3 className='flex items-center gap-2 text-xl font-semibold'>
          <MessageSquare className='h-5 w-5' />
          <span className='text-default-500'>Comments</span> ({comments.length})
        </h3>
      </CardHeader>

      <CardContent>
        {comments.length > 0 ? (
          <div className='scrollbar-hide max-h-84 space-y-4 overflow-y-auto'>
            {comments.map((comment) => (
              <div
                key={comment.id}
                className={cn(
                  'border-default-200 bg-default-50 hover:bg-default-100 relative rounded-lg border p-4 transition-colors',
                  isDeletingComment && comment.id === deleteCommentId ? 'pointer-events-none opacity-50' : '',
                )}
              >
                <div className='mb-2 flex items-start justify-between'>
                  <div className='flex items-center gap-2'>
                    <div className='bg-primary-500 flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold text-white'>
                      {comment.userId.substring(0, 2).toUpperCase()}
                    </div>

                    <span className='text-default-500 text-sm'>Anonymous</span>
                  </div>
                  {isCommentOwner(comment) && (
                    <div className='flex items-center justify-center gap-3 overflow-hidden rounded-full'>
                      <Button
                        disabled={isDeletingComment}
                        onClick={() => handleStartEditComment(comment.id)}
                        className={cn('text-default-500', editCommentId === comment.id && 'hidden')}
                        variant='secondary'
                        color='primary'
                        size='sm'
                      >
                        <Edit className='h-6 w-6' />
                      </Button>

                      {editCommentId === comment.id && (
                        <div className='flex items-center gap-2'>
                          <Button
                            disabled={isUpdatingComment}
                            onClick={() => handleSaveEditComment(comment)}
                            className={cn(
                              'text-default-500 rounded-full',
                              editCommentId === comment.id ? 'text-primary-500 border-2 p-1' : '',
                            )}
                            variant='secondary'
                            color='primary'
                            size='sm'
                          >
                            <Save className='h-6 w-6' />
                          </Button>

                          <Button
                            disabled={isUpdatingComment}
                            onClick={handleCancelEditComment}
                            className={cn(
                              'text-default-500 rounded-full',
                              editCommentId === comment.id ? 'text-primary-500 border-2 p-1' : '',
                            )}
                            variant='secondary'
                            color='primary'
                            size='sm'
                          >
                            <X className='h-6 w-6' />
                          </Button>
                        </div>
                      )}

                      <Button
                        onClick={() => handleDeleteComment(comment.id)}
                        disabled={isDeletingComment || editCommentId === comment.id}
                        variant='secondary'
                        color='danger'
                        size='sm'
                        className='rounded-full'
                      >
                        <Trash2 className='h-6 w-6' />
                      </Button>
                    </div>
                  )}
                </div>

                <p className={cn('text-default-700', editCommentId === comment.id ? 'hidden' : '')}>
                  {comment.content}
                </p>

                <Textarea
                  className={cn('w-full', editCommentId === comment.id ? '' : 'hidden')}
                  defaultValue={comment.content}
                  ref={textareaRef}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className='py-8 text-center'>
            <MessageSquare className='text-default-300 mx-auto mb-2 h-12 w-12' />

            <p className='text-default-500'>No comments yet.</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default CharacterCommentFieldComponent
