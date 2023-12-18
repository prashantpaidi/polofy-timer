import { serial, text, pgTable, integer, timestamp } from 'drizzle-orm/pg-core';
import { users } from '@/db/schema/users';

export const songs = pgTable('songs', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  imageUrl: text('image_url'),
  songUrl: text('song_url'),
  userId: text('user_id').references(() => users.id),
  createdDate: timestamp('created_date').defaultNow(),
});
