import z from 'zod'

export const UpdateCommentFormSchema = z.object({
  commentId: z.number(),

  comment: z.string().min(1),
})

export type IUpdateCommentForm = z.infer<typeof UpdateCommentFormSchema>
