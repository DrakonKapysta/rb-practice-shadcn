import z from 'zod'

export const AccountEmailChangeFormSchema = z.object({
  currentEmail: z.email().optional(),
  newEmail: z.email({ message: 'Invalid email address' }),
})

export type IAccountEmailChangeForm = z.infer<typeof AccountEmailChangeFormSchema>
