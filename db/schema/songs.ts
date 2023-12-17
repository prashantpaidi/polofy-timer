import { serial, text, pgTable, timestamp } from 'drizzle-orm/pg-core';

export const songs = pgTable('songs', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  imageUrl: text('image_url'),
  songUrl: text('song_url'),
  //   userId: integer('user_id').references(() => users.id),
  createdDate: timestamp('created_date').defaultNow(),
});
