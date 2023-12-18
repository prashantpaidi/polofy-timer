'use client';

import { Card, CardContent } from '@/components/ui/card';
import { requestNotificationPermission, showNotification } from '@/lib/utils';

import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';

import { useTimerStore } from '@/store/useTimerStore';
import TimerCountdown from './TimerCountdown';
import TimerControl from './TimerControl';
// import { DatabaseTest } from '@/lib/db';

export default function TimerDisplay() {
  useEffect(() => {
    // reset isRunning
    useTimerStore.persist.rehydrate();

    requestNotificationPermission();
    // DatabaseTest();
  }, []);

  const {
    isRunning,
    time,
    startTimer,
    switchToNextMode,
    currentTimerMode,
    resetTimer,
    switchToLongBreakMode,
    switchToShortBreakMode,
    switchToFocusMode,
  } = useTimerStore();

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && time > 0) {
      interval = setInterval(() => {
        useTimerStore.setState((state) => {
          const newTime = state.time - 1;
          return {
            time: newTime,
          };
        });
      }, 1000);
      if (currentTimerMode == 'focus' && time === 5 * 60) {
        showNotification('5 minutes more');
      }
    } else if (isRunning && time === 0) {
      if (currentTimerMode == 'focus') {
        showNotification('Now you can relax');
      }
      switchToNextMode();
    }

    return () => clearInterval(interval);
  }, [isRunning, time]);

  return (
    <div className='w-full flex justify-center items-center min-h-screen'>
      <Card className='w-96 m-2'>
        <CardContent className='p-2'>
          <div
            className='h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground grid w-full grid-cols-3 mb-4'
            data-orientation='horizontal'
            style={{ outline: 'none' }}
          >
            <button
              data-state={currentTimerMode === 'focus' ? 'active' : 'inactive'}
              className='inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm'
              onClick={() => {
                resetTimer();
                switchToFocusMode();
              }}
            >
              Pomodoro
            </button>
            <button
              data-state={
                currentTimerMode === 'shortBreak' ? 'active' : 'inactive'
              }
              className='inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm'
              onClick={() => {
                resetTimer();
                switchToShortBreakMode();
              }}
            >
              Short Break
            </button>
            <button
              data-state={
                currentTimerMode === 'longBreak' ? 'active' : 'inactive'
              }
              className='inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm'
              onClick={() => {
                resetTimer();
                switchToLongBreakMode();
              }}
            >
              Long Break
            </button>
          </div>

          <TimerCountdown time={time} />

          <TimerControl />
        </CardContent>
      </Card>
    </div>
  );
}
