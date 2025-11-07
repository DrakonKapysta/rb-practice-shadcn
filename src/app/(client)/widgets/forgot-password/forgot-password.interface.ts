import z from 'zod'

export const EmailFormSchema = z.object({
  email: z.email({ message: 'Invalid email address' }),
})

export type IEmailForm = z.infer<typeof EmailFormSchema>

export const PasswordResetFormSchema = z
  .object({
    password: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
    confirmPassword: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  })

export type IPasswordResetForm = z.infer<typeof PasswordResetFormSchema>
