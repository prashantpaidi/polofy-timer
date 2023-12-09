import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface TimerState {
  time: number;
  currentTimerMode: 'focus' | 'shortBreak' | 'longBreak';
  isRunning: boolean;
  isPaused: boolean;
  isEnd: boolean;
  cycleCount: number;
  interval: number;
  startTimer: () => void;
  pauseTimer: () => void;
  switchToFocusMode: () => void;
  switchToShortBreakMode: () => void;
  switchToLongBreakMode: () => void;
  switchToNextMode: () => void;
  resetTimer: () => void;
  setTime: (newTime: number) => void;
}

import { devtools } from 'zustand/middleware';

export const useTimerStore = create<TimerState>()(
  devtools(
    persist(
      (set) => ({
        time: 25 * 60,
        currentTimerMode: 'focus',
        isRunning: false,
        isPaused: false,
        isEnd: false,
        cycleCount: 1,
        interval: 4,

        startTimer: () =>
          set({ isRunning: true, isPaused: false, isEnd: false }),

        pauseTimer: () => {
          set({ isRunning: false });
          set({ isPaused: true });
        },

        resetTimer: () => {
          set({ isRunning: false, isPaused: false, isEnd: false });
        },

        setTime: (newTime: number) => {
          set({ time: newTime });
        },
        switchToFocusMode: () =>
          set((state) => ({
            currentTimerMode: 'focus',
            time: 25 * 60,
            cycleCount:
              state.cycleCount <= state.interval ? state.cycleCount + 1 : 1,
          })),

        switchToShortBreakMode: () =>
          set((state) => ({
            currentTimerMode: 'shortBreak',
            time: 5 * 60,
          })),
        switchToLongBreakMode: () =>
          set((state) => ({
            currentTimerMode: 'longBreak',
            time: 10 * 60,
          })),
        switchToNextMode: () =>
          set((state) => {
            const { cycleCount, interval, currentTimerMode, time } = state;
            console.log(1);
            let nextMode: 'focus' | 'shortBreak' | 'longBreak';
            let newCycleCount: number = cycleCount;
            let newTime;
            if (currentTimerMode === 'focus' && cycleCount < interval) {
              nextMode = 'shortBreak';
              newTime = 5 * 60;
            } else if (
              currentTimerMode === 'shortBreak' &&
              cycleCount < interval
            ) {
              nextMode = 'focus';
              newCycleCount = cycleCount + 1;
              newTime = 25 * 60;
            } else if (
              currentTimerMode === 'focus' &&
              cycleCount === interval
            ) {
              nextMode = 'longBreak';
              newTime = 10 * 60;
            } else {
              nextMode = 'focus';
              newCycleCount = 1;
              newTime = 25 * 60;
            }

            const newState = {
              ...state,
              isPaused: false,
              isRunning: false,
              cycleCount: newCycleCount,
              currentTimerMode: nextMode,
              time: newTime,
            };

            return newState;
          }),
      }),
      {
        name: 'timerStore',
        storage: createJSONStorage(() => localStorage),
        skipHydration: true,
      }
    )
  )
);
