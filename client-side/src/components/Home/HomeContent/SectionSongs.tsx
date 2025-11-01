import { Button } from "@/components/kit/button";
import type { ISongs } from "@/entities/types/type";
import { PlayButtonSong } from "./PlayButtonSong";
import { SectionSongsSkeleton } from "@/shared/ui/skeleton/SectionSongsSkeleton";
import { playerStore } from "@/entities/store/player-store";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

interface SectionSongsProps {
  title: string;
  songs: ISongs[];
  isLoading: boolean;
  link: string;
}

export const SectionSongs = observer(
  ({ isLoading, songs, title, link }: SectionSongsProps) => {
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
          <h2 className="text-xl sm:text-2xl font-bold">{title}</h2>
          <Link to={link}>
            <Button
              variant="link"
              className="text-sm text-zinc-400 hover:text-white"
            >
              Show all
            </Button>
          </Link>
        </div>
        {isLoading ? (
          <SectionSongsSkeleton />
        ) : (
          <>
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {songs.slice(0, 4).map((song) => (
                <div
                  key={song._id}
                  onClick={() => handlePlayTrack(song)}
                  className="bg-zinc-800/40 p-4 rounded-md hover:bg-zinc-700/40 transition-all group cursor-pointer border"
                >
                  <div className="relative mb-4">
                    <div className="aspect-square rounded-md shadow-lg overflow-hidden">
                      <img
                        src={song.imageUrl}
                        alt={song.title}
                        className="w-full h-full object-cover transition-transform duration-300 
									group-hover:scale-105"
                      />
                    </div>
                    <PlayButtonSong song={song} />
                  </div>
                  <h3 className="font-medium mb-2 truncate">{song.title}</h3>
                  <p className="text-sm text-zinc-400 truncate">
                    {song.artist}
                  </p>
                </div>
              ))}
            </div>
            <div className="md:hidden grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] sm:grid-cols-[repeat(auto-fit,minmax(380px,1fr))] gap-4 mb-8">
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
                    className="w-20 h-20 object-cover flex-shrink-0"
                  />
                  <div className="flex-1 p-4">
                    <p className="font-medium truncate">{song.title}</p>
                    <p className="text-sm text-zinc-400 truncate">
                      {song.artist}
                    </p>
                  </div>
                  <PlayButtonSong song={song} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    );
  },
);
