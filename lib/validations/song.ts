import * as z from 'zod';

export const SongValidation = z.object({
  title: z
    .string()
    .min(3, { message: 'Minimum 3 characters.' })
    .max(50, { message: 'Maximum 50 characters.' }),
  songFile: z.string().url().nonempty(),
  songImage: z.string().url().nonempty(),
});
