import { useTimerStore } from '@/store/useTimerStore';
import { Button } from './ui/button';

export default function TimerControl() {
  const {
    isRunning,
    isPaused,
    startTimer,
    pauseTimer,
    resetTimer,
    switchToNextMode,
  } = useTimerStore();

  return (
    <div className='flex flex-col items-center gap-3 my-6'>
      {!isRunning ? (
        <Button
          onClick={() => {
            startTimer();
          }}
          className='flex mx-auto w-28'
        >
          {isPaused ? 'Resume' : 'Start'}
        </Button>
      ) : (
        // skip mode change function
        <div className='flex gap-8'>
          <Button
            onClick={() => {
              pauseTimer();
            }}
            className='flex mx-auto w-28'
          >
            Pause
          </Button>
          <Button
            variant='outline'
            onClick={() => {
              switchToNextMode();
            }}
            className='flex mx-auto w-28'
          >
            Skip
          </Button>
        </div>
      )}
    </div>
  );
}
