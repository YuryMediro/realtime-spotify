import { FeaturedSkeleton } from "@/shared/ui/skeleton/FeaturedSkeleton";
import type { ISongs } from "@/entities/types/type";
import { PlayButtonSong } from "./PlayButtonSong";
import { observer } from "mobx-react-lite";
import { playerStore } from "@/entities/store/player-store";
import { Music, Plus } from "lucide-react";
import { Button } from "@/components/kit/button";
import { Link } from "react-router-dom";
import { useAdmin } from "@/shared/hooks/ApiHooks/useAdmin/useAdmin";

interface FeaturedSectionProps {
  featuredSongs: ISongs[];
  isLoading: boolean;
}

export const FeaturedSection = observer(
  ({ featuredSongs, isLoading }: FeaturedSectionProps) => {
    const { data: adminStatus } = useAdmin();
    const isAdmin = adminStatus?.admin || false;

    const { currentSong } = playerStore;

    const handlePlayTrack = (song: ISongs) => {
      if (currentSong?._id === song._id) {
        playerStore.togglePlay();
      } else {
        playerStore.setCurrentSong(song);
      }
    };

    if (isLoading) return <FeaturedSkeleton />;

    if (!featuredSongs || featuredSongs.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-12 px-4 text-center mb-8">
          <div className="relative mb-8">
            <div
              className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-sky-500 rounded-full blur-lg
       opacity-75 animate-pulse"
              aria-hidden="true"
            />
            <div className="relative bg-zinc-900 rounded-full p-4">
              <Music className="size-8 text-emerald-400" />
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-2">No featured songs yet</h3>
          <p className="text-zinc-400 max-w-md mb-6">
            It looks like there are no featured songs available right now. Check
            back later or explore other sections of the app. Wait for the
            administrator to add the song.
          </p>
          {isAdmin && (
            <Link to={"/admin"} className="flex gap-3">
              <Button variant="outline" className="gap-2">
                <Plus className="w-4 h-4" />
                Add Songs
              </Button>
            </Link>
          )}
        </div>
      );
    }
    return (
      <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] sm:grid-cols-[repeat(auto-fit,minmax(380px,1fr))] gap-4 mb-8">
        {featuredSongs.map((song) => (
          <div
            key={song._id}
            onClick={() => handlePlayTrack(song)}
            className="flex items-center bg-zinc-800/50 rounded-md overflow-hidden
         hover:bg-zinc-700/50 transition-colors group cursor-pointer relative border"
          >
            <img
              src={song.imageUrl}
              alt={song.title}
              className="w-20 h-20 object-cover flex-shrink-0"
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
