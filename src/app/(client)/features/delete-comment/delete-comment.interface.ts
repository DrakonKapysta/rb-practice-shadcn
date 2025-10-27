import z from 'zod'

export const DeleteCommentFormSchema = z.object({
  commentId: z.number(),
  characterId: z.number(),
})

export type IDeleteCommentForm = z.infer<typeof DeleteCommentFormSchema>
