interface TimerCountdownProps {
  time: number;
}

const TimerCountdown = ({ time }: TimerCountdownProps) => {
  const hours = Math.floor(time / 3600);

  // Calculate remaining seconds after subtracting hours
  const remainingSecondsAfterHours = time % 3600;

  // Calculate minutes
  const minutes = Math.floor(remainingSecondsAfterHours / 60);

  // Calculate remaining seconds after subtracting minutes
  const seconds = remainingSecondsAfterHours % 60;

  let formattedTime = '';

  if (hours > 0) {
    formattedTime = `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  } else {
    formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  }

  return (
    <div className='text-7xl font-bold text-neutral-900 text-center p-5'>
      {formattedTime}
    </div>
  );
};

export default TimerCountdown;
