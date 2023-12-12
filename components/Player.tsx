'use client';
import { useEffect, useRef, useState } from 'react';
import useMusicPlayerStore from '../store/useMusicPlayerStore';
import { FaPlay, FaPause } from 'react-icons/fa';
import { MdSkipNext, MdSkipPrevious } from 'react-icons/md';

const trackList: string[] = [
  'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3?_=1',
  'https://freetestdata.com/wp-content/uploads/2021/09/Free_Test_Data_100KB_MP3.mp3',
  // Add more track URLs here
];

const MusicPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const { currentTrackIndex, isPlaying, setTrack, play, pause } =
    useMusicPlayerStore();
  const [volume, setVolume] = useState(0.7);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState<number>(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
  }, [isPlaying, audioRef.current, currentTrackIndex]);

  const handlePlayPause = () => {
    if (isPlaying) pause();
    else play();
  };

  const handlePrevTrack = () => {
    setTrack((currentTrackIndex - 1 + trackList.length) % trackList.length);
  };

  const handleNextTrack = () => {
    setTrack((currentTrackIndex + 1) % trackList.length);
  };

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    // Update the audio volume
    audio.volume = Number(event.target.value);
    setVolume(parseFloat(event.target.value));
  };

  const handleSeekChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    const newTime = parseFloat(event.target.value);
    audio.currentTime = newTime;
  };

  const metadataLoadHandler = () => {
    setDuration(Number(audioRef?.current?.duration));
  };
  function formatTime(time: any) {
    if (time && !isNaN(time)) {
      const minutes =
        Math.floor(time / 60) < 10
          ? `0${Math.floor(time / 60)}`
          : Math.floor(time / 60);
      const seconds =
        Math.floor(time % 60) < 10
          ? `0${Math.floor(time % 60)}`
          : Math.floor(time % 60);

      return `${minutes}:${seconds}`;
    }
    return '00:00';
  }

  return (
    <div className='fixed bottom-0 left-0 right-0 bg-slate-950 text-white p-4 z-50'>
      <div className='flex justify-between items-center max-w-screen-lg mx-auto'>
        {/* Audio Element */}
        <audio
          ref={audioRef}
          key={trackList[currentTrackIndex]}
          onEnded={() => {
            handleNextTrack();
          }}
          onTimeUpdate={() => {
            setProgress(Number(audioRef?.current?.currentTime));
          }}
          onError={(e) => console.error('Audio Error:', e)}
          onLoadedMetadata={metadataLoadHandler}
        >
          <source src={trackList[currentTrackIndex]} type='audio/mpeg' />
        </audio>

        {/* Player Controls */}
        <div className='flex items-center space-x-4'>
          <button onClick={handlePrevTrack} className='text-2xl'>
            <MdSkipPrevious />
          </button>
          <button onClick={handlePlayPause} className='text-3xl'>
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
          <button onClick={handleNextTrack} className='text-2xl'>
            <MdSkipNext />
          </button>
        </div>

        {/* Track Info */}
        {/* <div className='flex-1 mx-4'>
          <p className='text-lg font-semibold'>Lo-fi Chill Beats</p>
          <p className='text-sm'>Lo-fi Artist</p>
        </div> */}

        {/* Seek Control */}
        {/* <div className='max-w-screen-md'> */}
        <input
          type='range'
          min='0'
          max='100'
          value={progress}
          onChange={handleSeekChange}
          className='w-72 hidden md:block'
        />
        <span>{formatTime(progress) + ' / ' + formatTime(duration)}</span>
        {/* Volume Control */}
        <div className='flex items-center'>
          <span className='text-sm mr-2'>Volume</span>
          <input
            type='range'
            step={0.05}
            min='0'
            max='1'
            value={volume}
            onChange={handleVolumeChange}
            className='w-24'
          />
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
