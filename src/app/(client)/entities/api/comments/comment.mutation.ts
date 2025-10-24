import { mutationOptions } from '@tanstack/react-query'

import { ECommentQueryKey, ICreateComment, IUpdateCommnent } from '@/app/(client)/entities/models'
import { getQueryClient } from '@/pkg/libraries/rest-api'
import { loggerUtil } from '@/pkg/utils/logger'

import { createComment, deleteComment, updateComment } from './comment.api'

const queryClient = getQueryClient()

export const createCommentMutationOptions = () => {
  return mutationOptions({
    mutationFn: (comment: ICreateComment) => createComment(comment),

    onSuccess: async (comment) => {
      if (comment.success) {
        await queryClient.invalidateQueries({
          queryKey: [ECommentQueryKey.COMMENTS_CHARACTER_ID, comment.result?.characterId],
        })
      }
    },

    onError: (error) => {
      loggerUtil({
        text: 'CreateCommentMutationOptions',
        value: (error as Error).message,
        level: 'error',
      })
    },
  })
}

export const deleteCommentMutatationOptions = () => {
  return mutationOptions({
    mutationFn: ({ commentId, characterId }: { commentId: number; characterId?: number }) =>
      deleteComment(commentId, characterId),

    onSuccess: async (commentDeleteResult) => {
      if (commentDeleteResult.result?.characterId) {
        await queryClient.invalidateQueries({
          queryKey: [ECommentQueryKey.COMMENTS_CHARACTER_ID, commentDeleteResult.result?.characterId],
        })
      } else if (commentDeleteResult.result?.deletedId) {
        await queryClient.invalidateQueries({
          queryKey: [ECommentQueryKey.COMMENTS, commentDeleteResult.result?.deletedId],
        })
      }
    },

    onError: (error) => {
      loggerUtil({
        text: 'DeleteCommentMutationOptions',
        value: (error as Error).message,
        level: 'error',
      })
    },
  })
}

export const updateCommentMutationOptions = () => {
  return mutationOptions({
    mutationFn: ({ commentId, comment }: { commentId: number; comment: IUpdateCommnent }) =>
      updateComment(commentId, comment),

    onSuccess: async (comment) => {
      if (comment) {
        await queryClient.invalidateQueries({
          queryKey: [ECommentQueryKey.COMMENTS_CHARACTER_ID, comment.result?.characterId],
        })
      }
    },

    onError: (error) => {
      loggerUtil({
        text: 'UpdateCommentMutationOptions',
        value: (error as Error).message,
        level: 'error',
      })
    },
  })
}
