import { integer, pgTable, serial, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { authUsers } from 'drizzle-orm/supabase'

export const comment = pgTable('comment', {
  id: serial('id').primaryKey(),
  content: text('content').notNull(),
  characterId: integer('character_id').notNull(),
  userId: uuid('user_id')
    .notNull()
    .references(() => authUsers.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})
