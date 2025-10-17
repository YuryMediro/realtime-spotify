import { FeaturedSkeleton } from "@/shared/ui/skeleton/FeaturedSkeleton";
import type { ISongs } from "@/entities/types/type";
import { PlayButtonSong } from "./PlayButtonSong";
import { observer } from "mobx-react-lite";
import { playerStore } from "@/entities/store/player-store";

interface FeaturedSectionProps {
  featuredSongs: ISongs[];
  isLoading: boolean;
}

export const FeaturedSection = observer(
  ({ featuredSongs, isLoading }: FeaturedSectionProps) => {
    if (isLoading) return <FeaturedSkeleton />;

    const { currentSong } = playerStore;

    const handlePlayTrack = (song: ISongs) => {
      if (currentSong?._id === song._id) {
        playerStore.togglePlay();
      } else {
        playerStore.setCurrentSong(song);
      }
    };

    return (
      <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] sm:grid-cols-[repeat(auto-fit,minmax(380px,1fr))] gap-4 mb-8">
        {featuredSongs.map((song) => (
          <div
            key={song._id}
            onClick={() => handlePlayTrack(song)}
            className="flex items-center bg-zinc-800/50 rounded-md overflow-hidden
         hover:bg-zinc-700/50 transition-colors group cursor-pointer relative"
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
    );
  },
);
