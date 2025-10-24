import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  out: './src/pkg/libraries/drizzle/migrations',
  schema: './src/pkg/libraries/drizzle/schema',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  entities: {
    roles: {
      provider: 'supabase',
    },
  },
})
