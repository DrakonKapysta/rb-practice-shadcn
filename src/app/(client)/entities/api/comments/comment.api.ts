'use server'

import { and, asc, desc, eq, ilike, sql } from 'drizzle-orm'
import { cacheLife, cacheTag, revalidateTag, unstable_cache, updateTag } from 'next/cache'

import { captureException } from '@sentry/nextjs'

import {
  ICommentMutationCreateResult,
  ICommentMutationDeleteResult,
  ICommentMutationUpdateResult,
  ICommentsFilters,
  ICreateComment,
  IUpdateCommnent,
} from '@/app/(client)/entities/models'
import { createServerClient } from '@/pkg/integrations/supabase'
import { comments, db, withPagination } from '@/pkg/libraries/db'

export async function getCommentById(commentId: number) {
  'use cache'
  cacheLife('max')
  cacheTag(`comments-id-${commentId}`)

  try {
    const result = await db.select().from(comments).where(eq(comments.id, commentId))

    return result
  } catch (error) {
    captureException(error, {
      tags: { characterId: commentId, function: 'CommentApi.getCommentById', type: 'database_error' },
    })

    throw error
  }
}

export async function getCommentsByCharacterId(characterId: number, filters?: ICommentsFilters) {
  'use cache'
  cacheLife('max')
  cacheTag(`comments-character-id-${characterId}`)

  try {
    let query = db
      .select()
      .from(comments)
      .where(
        and(
          eq(comments.characterId, characterId),
          filters?.search ? ilike(comments.content, `%${filters?.search}%`) : undefined,
        ),
      )
      .orderBy(filters?.orderDirection === 'asc' ? asc(comments.createdAt) : desc(comments.createdAt))
      .$dynamic()

    query = withPagination(query, filters?.offset, filters?.limit)

    return await query.execute()
  } catch (error) {
    captureException(error, {
      tags: { characterId: characterId, function: 'CommentApi.getCommentsByCharacterId', type: 'database_error' },
    })

    throw error
  }
}

export async function createComment(comment: ICreateComment): Promise<ICommentMutationCreateResult> {
  try {
    const supabase = await createServerClient()
    const user = await supabase.auth.getUser()

    if (!user.data.user?.id) {
      return { success: false, error: { message: 'User not authenticated', statusCode: 401 } }
    }

    const commentData = {
      ...comment,
      userId: user.data.user.id,
    }
    const result = await db.insert(comments).values(commentData).returning()

    updateTag(`comments-character-id-${comment.characterId}`)

    return { success: true, result: result[0] }
  } catch (error) {
    captureException(error, {
      tags: { characterId: comment.characterId, function: 'CommentApi.createComment', type: 'database_error' },
    })

    return { success: false, error: { message: 'Failed to create comment', statusCode: 500 } }
  }
}

export async function getComments(filters?: ICommentsFilters) {
  'use cache'
  cacheLife('max')
  cacheTag(`comments-list`, JSON.stringify(filters))

  try {
    if (!filters) {
      let query = db.select().from(comments).$dynamic()
      query = withPagination(query, 1, 10)
      return await query
    }

    let query = db
      .select()
      .from(comments)
      .where(
        and(
          filters.characterId ? eq(comments.characterId, filters?.characterId) : undefined,
          filters.commentId ? eq(comments.id, parseInt(filters?.commentId)) : undefined,
          filters.search ? ilike(comments.content, `%${filters?.search}%`) : undefined,
        ),
      )
      .orderBy(filters?.orderDirection === 'asc' ? asc(comments.createdAt) : desc(comments.createdAt))
      .$dynamic()

    query = withPagination(query, filters.offset, filters?.limit)

    return await query
  } catch (error) {
    captureException(error, {
      tags: {
        ...filters,

        function: 'CommentApi.getComments',
        type: 'database_error',
      },
    })

    throw error
  }
}

export async function deleteComment(commentId: number, characterId?: number): Promise<ICommentMutationDeleteResult> {
  try {
    const deletedId = await db.delete(comments).where(eq(comments.id, commentId)).returning({ deletedId: comments.id })

    if (!deletedId || deletedId.length === 0) {
      return { success: false, error: { message: 'Failed to delete comment', statusCode: 500 } }
    }

    if (characterId) {
      updateTag(`comments-character-id-${characterId}`)
    }

    return { success: true, result: { deletedId: deletedId[0].deletedId, characterId } }
  } catch (error) {
    captureException(error, {
      tags: { commentId, function: 'CommentApi.deleteComment', type: 'database_error' },
    })

    return { success: false, error: { message: 'Failed to delete comment', statusCode: 500 } }
  }
}

export async function updateComment(
  commentId: number,
  comment: IUpdateCommnent,
): Promise<ICommentMutationUpdateResult> {
  try {
    const updatedCommnet = await db
      .update(comments)
      .set({ ...comment, updatedAt: sql`NOW()` })
      .where(eq(comments.id, commentId))
      .returning()

    if (!updatedCommnet || updatedCommnet.length === 0) {
      return { success: false, error: { message: 'Failed to update comment', statusCode: 500 } }
    }

    updateTag(`comments-character-id-${comment.characterId}`)

    return { success: true, result: updatedCommnet[0] }
  } catch (error) {
    captureException(error, {
      tags: { commentId, function: 'CommentApi.updateComment', type: 'database_error' },
    })

    return { success: false, error: { message: 'Failed to update comment', statusCode: 500 } }
  }
}
