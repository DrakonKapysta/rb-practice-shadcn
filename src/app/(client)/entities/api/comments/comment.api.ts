'use server'

import { and, asc, desc, eq, ilike, sql } from 'drizzle-orm'
import { cacheLife, cacheTag, updateTag } from 'next/cache'
import { headers } from 'next/headers'

import {
  ICommentMutationCreateResult,
  ICommentMutationDeleteResult,
  ICommentMutationUpdateResult,
  ICommentsFilters,
  ICreateComment,
  IUpdateComment,
} from '@/app/(client)/entities/models'
import { auth } from '@/pkg/integrations/better-auth'
import { comment, db } from '@/pkg/libraries/drizzle'
import { withPagination } from '@/pkg/utils/db'
import { loggerUtil } from '@/pkg/utils/logger'

export async function getCommentById(commentId: number) {
  'use cache'
  cacheLife('hours')
  cacheTag(`comments-id-${commentId}`)

  try {
    const result = await db.select().from(comment).where(eq(comment.id, commentId))

    return result
  } catch (error) {
    loggerUtil({ text: 'CommentApi.getCommentById', value: (error as Error).message, level: 'error' })

    throw error
  }
}

export async function getCommentsByCharacterId(characterId: number, filters?: ICommentsFilters) {
  'use cache'
  cacheLife('hours')
  cacheTag(`comments-character-id-${characterId}`)

  try {
    let query = db
      .select()
      .from(comment)
      .where(
        and(
          eq(comment.characterId, characterId),
          filters?.search ? ilike(comment.content, `%${filters?.search}%`) : undefined,
        ),
      )
      .orderBy(filters?.orderDirection === 'asc' ? asc(comment.createdAt) : desc(comment.createdAt))
      .$dynamic()

    query = withPagination(query, filters?.offset, filters?.limit)

    return await query.execute()
  } catch (error) {
    loggerUtil({ text: 'CommentApi.getCommentsByCharacterId', value: (error as Error).message, level: 'error' })

    throw error
  }
}

export async function createComment(commentData: ICreateComment): Promise<ICommentMutationCreateResult> {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    })

    if (!session?.user?.id) {
      return { success: false, error: { message: 'User not authenticated', statusCode: 401 } }
    }

    const result = await db
      .insert(comment)
      .values({
        ...commentData,
        userId: session.user.id,
      })
      .returning()

    updateTag(`comments-character-id-${commentData.characterId}`)

    return { success: true, result: result[0] }
  } catch (error) {
    loggerUtil({ text: 'CommentApi.createComment', value: (error as Error).message, level: 'error' })

    return { success: false, error: { message: 'Failed to create comment', statusCode: 500 } }
  }
}

export async function getComments(filters?: ICommentsFilters) {
  'use cache'
  cacheLife('hours')
  cacheTag(`comments-list`, JSON.stringify(filters))

  try {
    if (!filters) {
      let query = db.select().from(comment).$dynamic()
      query = withPagination(query, 1, 10)
      return await query
    }

    let query = db
      .select()
      .from(comment)
      .where(
        and(
          filters.characterId ? eq(comment.characterId, filters?.characterId) : undefined,
          filters.commentId ? eq(comment.id, parseInt(filters?.commentId)) : undefined,
          filters.search ? ilike(comment.content, `%${filters?.search}%`) : undefined,
        ),
      )
      .orderBy(filters?.orderDirection === 'asc' ? asc(comment.createdAt) : desc(comment.createdAt))
      .$dynamic()

    query = withPagination(query, filters.offset, filters?.limit)

    return await query
  } catch (error) {
    loggerUtil({ text: 'CommentApi.getComments', value: (error as Error).message, level: 'error' })

    throw error
  }
}

export async function deleteComment(commentId: number, characterId?: number): Promise<ICommentMutationDeleteResult> {
  try {
    const deletedId = await db.delete(comment).where(eq(comment.id, commentId)).returning({ deletedId: comment.id })

    if (!deletedId || deletedId.length === 0) {
      return { success: false, error: { message: 'Failed to delete comment', statusCode: 500 } }
    }

    if (characterId) {
      updateTag(`comments-character-id-${characterId}`)
    }

    return { success: true, result: { deletedId: deletedId[0].deletedId, characterId } }
  } catch (error) {
    loggerUtil({ text: 'CommentApi.deleteComment', value: (error as Error).message, level: 'error' })

    return { success: false, error: { message: 'Failed to delete comment', statusCode: 500 } }
  }
}

export async function updateComment(
  commentId: number,
  commentData: IUpdateComment,
): Promise<ICommentMutationUpdateResult> {
  try {
    const updatedComment = await db
      .update(comment)
      .set({ ...commentData, updatedAt: sql`NOW()` })
      .where(eq(comment.id, commentId))
      .returning()

    if (!updatedComment || updatedComment.length === 0) {
      return { success: false, error: { message: 'Failed to update comment', statusCode: 500 } }
    }

    updateTag(`comments-character-id-${commentData.characterId}`)

    return { success: true, result: updatedComment[0] }
  } catch (error) {
    loggerUtil({ text: 'CommentApi.updateComment', value: (error as Error).message, level: 'error' })
    return { success: false, error: { message: 'Failed to update comment', statusCode: 500 } }
  }
}
