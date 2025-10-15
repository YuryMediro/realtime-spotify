import { musicStore } from "@/entities/store/music-store";
import { playerStore } from "@/entities/store/player-store";
import type { ISongs } from "@/entities/types/type";

export const usePlayAlbum = () => {
  const handlePlayAll = () => {
    const { currentAlbum } = musicStore;
    const { currentSong } = playerStore;
    if (currentAlbum?.songs) {
      const isCurrentAlbumPlaying = currentAlbum.songs.some(
        (song) => song._id === currentSong?._id,
      );
      if (isCurrentAlbumPlaying) {
        playerStore.togglePlay();
      } else {
        playerStore.playAlbum(currentAlbum.songs, 0);
      }
    }
  };
  return { handlePlayAll };
};

export const usePlayTrackAlbum = () => {
  const handlePlayTrack = (song: ISongs, albumSongs: ISongs[]) => {
    const { currentSong } = playerStore;
    if (currentSong?._id === song._id) {
      playerStore.togglePlay();
    } else {
      playerStore.initializeQueue(albumSongs);
      playerStore.setCurrentSong(song);
    }
  };
  return { handlePlayTrack };
};
