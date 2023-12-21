'use server';

import { songs } from '@/db/schema/songs';
import { db } from '@/lib/db';

export const getSongList = async () => {
  const songList = await db.select({ songURL: songs.songUrl }).from(songs);
  console.log('songList', songList);
  return songList;
};
