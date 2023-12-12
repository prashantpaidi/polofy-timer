import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// notification helper fuctions
export const requestNotificationPermission = async () => {
  'use client';
  console.log('form requestNotificationPermission()');
  if (Notification.permission !== 'granted') {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      console.log('Notification permission granted');
    } else {
      console.log('Notification permission denied');
    }
  }
};

export const showNotification = (msg:string) => {
  'use client';

  if (Notification.permission === 'granted') {
    const notification = new Notification(msg);

    notification.onclick = () => {
      console.log('Notification clicked!');
    };
  }
};
