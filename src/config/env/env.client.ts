import { z } from 'zod'

import { createEnv } from '@t3-oss/env-nextjs'

export const envClient = createEnv({
  client: {
    NEXT_PUBLIC_CLIENT_WEB_URL: z.string().min(1, { message: 'NEXT_PUBLIC_CLIENT_WEB_URL is required' }),
    NEXT_PUBLIC_CLIENT_API_URL: z.string().min(1, { message: 'NEXT_PUBLIC_CLIENT_API_URL is required' }),
    // NEXT_PUBLIC_MIXPANEL_TOKEN: z.string().min(1, { message: 'NEXT_PUBLIC_MIXPANEL_TOKEN is required' }),
    // NEXT_PUBLIC_SUPABASE_URL: z.string().min(1, { message: 'NEXT_PUBLIC_SUPABASE_URL is required' }),
    // NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: z
    //   .string()
    //   .min(1, { message: 'NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY is required' }),
    NEXT_PUBLIC_EXTERNAL_API_URL: z.string().min(1, { message: 'NEXT_PUBLIC_EXTERNAL_API_URL is required' }),
  },
  emptyStringAsUndefined: true,
  runtimeEnv: {
    NEXT_PUBLIC_CLIENT_WEB_URL: process.env.NEXT_PUBLIC_CLIENT_WEB_URL,
    NEXT_PUBLIC_CLIENT_API_URL: process.env.NEXT_PUBLIC_CLIENT_API_URL,
    // NEXT_PUBLIC_MIXPANEL_TOKEN: process.env.NEXT_PUBLIC_MIXPANEL_TOKEN,
    // NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    // NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    NEXT_PUBLIC_EXTERNAL_API_URL: process.env.NEXT_PUBLIC_EXTERNAL_API_URL,
  },
})
