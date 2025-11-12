import z from 'zod'

export const AccountChangePasswordFormSchema = z
  .object({
    currentPassword: z.string().min(1, { message: 'Current password is required' }),
    newPassword: z.string().min(1, { message: 'New password is required' }),
    confirmPassword: z.string().min(1, { message: 'Confirm password is required' }),
    revokeOtherSessions: z.boolean(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  })

export type IAccountChangePasswordForm = z.infer<typeof AccountChangePasswordFormSchema>
