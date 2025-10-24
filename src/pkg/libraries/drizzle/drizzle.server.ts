import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

import { account, comment, session, user, verification } from './schema'

const client = postgres(process.env.DATABASE_URL!, { prepare: false })
const db = drizzle({ client, schema: { ...comment, ...account, ...session, ...verification, ...user } })

export default db
