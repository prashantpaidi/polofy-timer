import { auth } from '@/lib/auth';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import AddSongForm from '@/components/AddSongForm';
import { redirect } from 'next/navigation';

export default async function SongForm() {
  // authConfig
  const session = await auth();
  if (!session || !session.user) {
    redirect('/api/auth/signin?callbackUrl=/Member');
  }

  if (session?.user?.role != 'admin')
    return (
      <div className='text-5xl flex justify-center items-center h-[100vh]'>
        Sorry!!! your not allowed to add song
      </div>
    );
  return (
    <div className='flex justify-center items-center h-[100vh]'>
      <Card className='w-[350px]'>
        <CardHeader>
          <CardTitle>Add a Music</CardTitle>
          <CardDescription>Add a Lofi music</CardDescription>
        </CardHeader>
        <CardContent>
          <AddSongForm />
        </CardContent>
      </Card>
    </div>
  );
}
