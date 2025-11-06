import z from 'zod'

export const AccountEmailChangeSchema = z.object({
  currentEmail: z.email().optional(),
  newEmail: z.email({ message: 'Invalid email address' }),
})

export type IAccountEmailChange = z.infer<typeof AccountEmailChangeSchema>
