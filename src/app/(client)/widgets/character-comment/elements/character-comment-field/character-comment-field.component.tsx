'use client'

import { Edit, MessageSquare } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { FC, useState } from 'react'

import { useQuery } from '@tanstack/react-query'

import { commentsByCharacterIdQueryOptions } from '@/app/(client)/entities/api'
import { IComment } from '@/app/(client)/entities/models'
import DeleteCommentComponent from '@/app/(client)/features/delete-comment/delete-comment.component'
import { UpdateCommentComponent } from '@/app/(client)/features/update-comment'
import { Button, Card, CardContent, CardHeader, StatusCardComponent } from '@/app/(client)/shared/ui'
import { authClient } from '@/pkg/integrations/better-auth/auth-client'
import { cn } from '@/pkg/utils/ui'

interface IProps {
  characterId: number
}

const CharacterCommentFieldComponent: FC<Readonly<IProps>> = (props) => {
  const { characterId } = props

  const t = useTranslations('characterComment.commentField')

  const [editCommentId, setEditCommentId] = useState<number | null>(null)

  const { data: session } = authClient.useSession()

  const {
    data: comments,
    isLoading,
    error,
  } = useQuery(commentsByCharacterIdQueryOptions(characterId, { orderDirection: 'asc' }))

  const handleStartEditComment = (commentId: number) => {
    setEditCommentId(commentId)
  }

  const handleCancelEditComment = () => {
    setEditCommentId(null)
  }

  const isCommentOwner = (comment: IComment) => {
    return session?.user?.id && comment.userId === session.user.id
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
                )}
              >
                <div className='mb-2 flex items-start justify-between'>
                  <div className='flex items-center gap-2'>
                    <div className='bg-primary-500 flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold text-white'>
                      {comment.userId.substring(0, 2).toUpperCase()}
                    </div>

                    <span className='text-default-500 text-sm'>{t('userName')}</span>
                  </div>
                  {isCommentOwner(comment) && (
                    <div className='flex items-center justify-center gap-3 overflow-hidden rounded-full'>
                      <Button
                        onClick={() => handleStartEditComment(comment.id)}
                        className={cn('text-default-500', editCommentId === comment.id && 'hidden')}
                        variant='secondary'
                        color='primary'
                        size='sm'
                      >
                        <Edit className='h-6 w-6' />
                      </Button>

                      <DeleteCommentComponent commentId={comment.id} characterId={characterId} />
                    </div>
                  )}
                </div>

                <p className={cn('text-default-700', editCommentId === comment.id ? 'hidden' : '')}>
                  {comment.content}
                </p>

                {editCommentId === comment.id && (
                  <UpdateCommentComponent
                    commentId={comment.id}
                    comment={comment.content}
                    characterId={characterId}
                    onCancel={() => handleCancelEditComment()}
                  />
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className='py-8 text-center'>
            <MessageSquare className='text-default-300 mx-auto mb-2 h-12 w-12' />

            <p className='text-default-500'>{t('noComments')}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default CharacterCommentFieldComponent
