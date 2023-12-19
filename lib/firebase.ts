import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const storageBucketString: string = process.env
  .NEXT_PUBLIC_STORAGE_BUCKET as string;

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: storageBucketString,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
