import { Button } from "@/components/kit/button";
import { playerStore } from "@/entities/store/player-store";
import type { IAlbums } from "@/entities/types/type";
import { usePlayAlbum } from "@/shared/hooks/usePlaySong";
import { Pause, Play } from "lucide-react";
import { observer } from "mobx-react-lite";

interface PlayButtonProps {
  currentAlbum: IAlbums;
}

export const PlayButton = observer(({ currentAlbum }: PlayButtonProps) => {
  const { isPlaying, currentSong } = playerStore;
  const { handlePlayAll } = usePlayAlbum();

  const isAlbumPlaying = currentAlbum?.songs?.some(
    (song) => song._id === currentSong?._id,
  );
  const handlePlay = () => {
    handlePlayAll(currentAlbum);
  };

  return (
    <div className="px-6 pb-4 flex items-center gap-6">
      <Button
        size="icon"
        className="w-14 h-14 rounded-full bg-green-400 hover:bg-green-400 
                hover:scale-105 transition-all"
        onClick={handlePlay}
      >
        {isAlbumPlaying && isPlaying ? (
          <Pause className="h-7 w-7 text-black" />
        ) : (
          <Play className="h-7 w-7 text-black" />
        )}
      </Button>
    </div>
  );
});
