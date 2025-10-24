import { z } from 'zod'

import { createEnv } from '@t3-oss/env-nextjs'

export const envServer = createEnv({
  server: {
    NODE_ENV: z.enum(['development', 'production']).optional().default('development'),

    // GROWTHBOOK_API_HOST: z.string().optional(),
    // GROWTHBOOK_CLIENT_KEY: z.string().optional(),
    // GROWTHBOOK_APP_ORIGIN: z.string().optional(),

    // FLAGS_SECRET: z.string().optional(),

    // MIXPANEL_TOKEN: z.string(),
    // MIXPANEL_HOST: z.string().optional(),

    // DATABASE_URL: z.string(),
  },
  emptyStringAsUndefined: true,
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,

    // GROWTHBOOK_API_HOST: process.env.GROWTHBOOK_API_HOST,
    // GROWTHBOOK_CLIENT_KEY: process.env.GROWTHBOOK_CLIENT_KEY,
    // GROWTHBOOK_APP_ORIGIN: process.env.GROWTHBOOK_APP_ORIGIN,

    // FLAGS_SECRET: process.env.FLAGS_SECRET,

    // MIXPANEL_TOKEN: process.env.MIXPANEL_TOKEN,
    // MIXPANEL_HOST: process.env.MIXPANEL_HOST,

    // DATABASE_URL: process.env.DATABASE_URL,
  },
})
