import { isMobilePhone } from 'validator'
import z from 'zod'

export const AccountBasicInfoSchema = z.object({
  phoneNumber: z
    .string()
    .optional()
    .refine((val) => !val || isMobilePhone(val), { message: 'Invalid phone number' }),
  address: z.string().optional(),
  country: z.string().optional(),
  birthDate: z.date().optional(),
  gender: z.string().optional(),
  surname: z.string().optional(),
  name: z.string().optional(),
})

export type IAccountBasicInfo = z.infer<typeof AccountBasicInfoSchema>
