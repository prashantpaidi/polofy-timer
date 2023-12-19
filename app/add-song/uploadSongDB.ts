'use server';

import { songs } from '@/db/schema/songs';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';

export const uploadSong = async (
  title: string,
  songURL: string,
  imageURL: string
) => {
  const session = await auth();

  const songId = await db
    .insert(songs)
    .values({
      title: title,
      songUrl: songURL,
      imageUrl: imageURL,
      userId: session?.user.id,
    })
    .returning({
      insertedId: songs.id,
    });
  console.log(songId);
};
