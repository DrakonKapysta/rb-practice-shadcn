import z from 'zod'

export const CreateCommentFormSchema = z.object({
  content: z
    .string()
    .min(1, { message: 'Comment must be at least 1 characters long' })
    .max(255, { message: 'Comment must be less than 255 characters long' }),
  characterId: z.number().min(0).max(1000),
})

export type ICreateCommentForm = z.infer<typeof CreateCommentFormSchema>
