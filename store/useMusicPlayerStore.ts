import { create } from 'zustand';
  
type MusicPlayerState = {
  currentTrackIndex: number;
  isPlaying: boolean;
  play: () => void;
  pause: () => void;
  setTrack: (index: number) => void;
};

const useMusicPlayerStore = create<MusicPlayerState>((set) => ({
  currentTrackIndex: 0,
  isPlaying: false,
  play: () => set({ isPlaying: true }),
  pause: () => set({ isPlaying: false }),
  setTrack: (index: number) => set({ currentTrackIndex: index }),
}));

export default useMusicPlayerStore;
