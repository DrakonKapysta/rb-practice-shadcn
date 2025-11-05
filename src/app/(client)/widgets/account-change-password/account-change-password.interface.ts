import z from 'zod'

export const AccountChangePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, { message: 'Current password is required' }),
    newPassword: z.string().min(1, { message: 'New password is required' }),
    confirmPassword: z.string().min(1, { message: 'Confirm password is required' }),
    revokeOtherSessions: z.boolean().optional(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  })

export type IAccountChangePassword = z.infer<typeof AccountChangePasswordSchema>
