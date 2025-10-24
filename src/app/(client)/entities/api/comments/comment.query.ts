import { queryOptions } from '@tanstack/react-query'

import { ECommentQueryKey, ICommentsFilters } from '@/app/(client)/entities/models'

import { getCommentById, getComments, getCommentsByCharacterId } from './comment.api'

export const commentByIdQueryOptions = (commentId: number) => {
  return queryOptions({
    queryKey: [ECommentQueryKey.COMMENTS, commentId],

    queryFn: () => getCommentById(commentId),
  })
}

export const commentsByCharacterIdQueryOptions = (characterId: number, filters?: ICommentsFilters) => {
  return queryOptions({
    queryKey: [ECommentQueryKey.COMMENTS_CHARACTER_ID, characterId],

    queryFn: () => getCommentsByCharacterId(characterId, filters),
  })
}

export const getCommentsQueryOptions = (filters?: ICommentsFilters) => {
  return queryOptions({
    queryKey: [ECommentQueryKey.COMMENTS, { ...filters }],

    queryFn: () => getComments(filters),
  })
}
