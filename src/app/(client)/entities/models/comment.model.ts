import { IResult } from '@/client/shared/interfaces'

export enum ECommentQueryKey {
  COMMENTS = 'comments',
  COMMENTS_CHARACTER_ID = 'comments-character-id',
}

export interface IComment {
  id: number
  content: string
  characterId: number
  userId: string
}

export interface ICommentMutationCreateResult extends IResult<IComment> {
  result?: IComment
}

export interface ICreateComment {
  content: string
  characterId: number
}

export interface IDeleteComment {
  commentId: number
  characterId?: number
}

export interface ICommentMutationDeleteResult
  extends IResult<{
    deletedId: number
    characterId?: number
  }> {
  result?: {
    deletedId: number
    characterId?: number
  }
}

export interface ICommentMutationUpdateResult extends IResult<IComment> {
  result?: IComment
}

export interface IUpdateCommnent extends Partial<ICreateComment> {}

export interface ICommentsFilters {
  characterId?: number
  commentId?: string
  limit?: number
  offset?: number
  orderDirection?: 'asc' | 'desc'
  search?: string
}
