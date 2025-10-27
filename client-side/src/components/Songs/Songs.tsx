import { playerStore } from "@/entities/store/player-store";
import type { ISongs } from "@/entities/types/type";
import { observer } from "mobx-react-lite";
import { PlayButtonSong } from "../Home/HomeContent/PlayButtonSong";
import { Button } from "../kit/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { SongsSkeleton } from "@/shared/ui/skeleton/SongsSkeleton";

interface SongsProps {
  title: string;
  songs: ISongs[];
  isLoading: boolean;
}
export const Songs = observer(({ isLoading, songs, title }: SongsProps) => {
  if (isLoading) return <SongsSkeleton />;
  const { currentSong } = playerStore;

  const handlePlayTrack = (song: ISongs) => {
    if (currentSong?._id === song._id) {
      playerStore.togglePlay();
    } else {
      playerStore.setCurrentSong(song);
    }
  };

  if (songs.length === 0) return null;
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <Link to={"/"}>
          <Button type="button">
            <ArrowLeft />
            <span>Go back</span>
          </Button>
        </Link>
        <h2 className="text-xl sm:text-2xl font-bold">{title}</h2>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] sm:grid-cols-[repeat(auto-fit,minmax(380px,1fr))] gap-4 mb-8">
        {songs.map((song) => (
          <div
            key={song._id}
            onClick={() => handlePlayTrack(song)}
            className="flex items-center bg-zinc-800/50 rounded-md overflow-hidden
         hover:bg-zinc-700/50 transition-colors group cursor-pointer relative border"
          >
            <img
              src={song.imageUrl}
              alt={song.title}
              className="w-16 sm:w-20 h-16 sm:h-20 object-cover flex-shrink-0"
            />
            <div className="flex-1 p-4">
              <p className="font-medium truncate">{song.title}</p>
              <p className="text-sm text-zinc-400 truncate">{song.artist}</p>
            </div>
            <PlayButtonSong song={song} />
          </div>
        ))}
      </div>
    </div>
  );
});
