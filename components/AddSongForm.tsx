'use client';
import React, { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

//ui
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

// storage
import { storage } from '@/lib/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

const SongValidation = z.object({
  title: z.string().min(1, 'Title is required'),
  songFile: z.string().optional(),
  songImageFile: z.string().optional(),
});

export default function AddSongForm() {
  const [songFile, setSongFile] = useState<File | null>(null);
  const [songImageFile, setSongImageFile] = useState<File | null>(null);

  const form = useForm({
    resolver: zodResolver(SongValidation),
    defaultValues: {
      title: '',
      songFile: '',
      songImageFile: '',
    },
  });

  const handleFileChange = (
    e: ChangeEvent<HTMLInputElement>,
    setFileFn: (file: File | null) => void
  ) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];
    setFileFn(file);
  };

  const onSubmit = async (values: z.infer<typeof SongValidation>) => {
    console.log('Form Values', values);
    console.log('Song File', songFile);
    console.log('Song Image File', songImageFile);

    if (songFile) {
      await uploadFile(songFile, 'songs');
    }
    if (songImageFile) {
      await uploadFile(songImageFile, 'images');
    }
  };

  const uploadFile = (file: File, type: String) => {
    if (file) {
      const fileRef = ref(storage, `lofi/${type}/${file.name}`);
      uploadBytes(fileRef, file).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          console.log('url', url);
        });
      });
    } else {
      console.log('No file');
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name='title'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <Input {...field} />
            </FormItem>
          )}
        />

        <FormField
          name='songFile'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Song File</FormLabel>
              <Input
                type='file'
                accept='audio/*'
                onChange={(e) => handleFileChange(e, setSongFile)}
              />
            </FormItem>
          )}
        />

        <FormField
          name='songImageFile'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Song Image</FormLabel>
              <Input
                type='file'
                accept='image/*'
                onChange={(e) => handleFileChange(e, setSongImageFile)}
              />
            </FormItem>
          )}
        />

        <div className='flex items-center py-6 '>
          <Button className=' w-full' type='submit'>
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
