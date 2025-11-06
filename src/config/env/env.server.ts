import { z } from 'zod'

import { createEnv } from '@t3-oss/env-nextjs'

export const envServer = createEnv({
  server: {
    NODE_ENV: z.enum(['development', 'production']).optional().default('development'),
    BETTER_AUTH_SECRET: z.string().min(1, { message: 'BETTER_AUTH_SECRET is required' }),
    BETTER_AUTH_URL: z.string().min(1, { message: 'BETTER_AUTH_URL is required' }).optional(),
    GOOGLE_CLIENT_ID: z.string().min(1, { message: 'GOOGLE_CLIENT_ID is required' }).optional(),
    GOOGLE_CLIENT_SECRET: z.string().min(1, { message: 'GOOGLE_CLIENT_SECRET is required' }).optional(),
  },
  emptyStringAsUndefined: true,
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  },
})
