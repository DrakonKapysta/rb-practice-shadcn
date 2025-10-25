import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'

import { user } from './better-auth'

export const comment = pgTable('comment', {
  id: serial('id').primaryKey(),
  content: text('content').notNull(),
  characterId: integer('character_id').notNull(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})
