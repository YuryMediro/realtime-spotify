import type { IAlbums } from "@/entities/types/type";

interface AlbumContentProps {
  currentAlbum: IAlbums;
}

export const AlbumContent = ({ currentAlbum }: AlbumContentProps) => {
  return (
    <div className="relative z-10">
      <div className="flex flex-col items-center lg:flex-row lg:items-start p-6 gap-3 lg:gap-6 pb-0 lg:pb-8">
        <img
          src={currentAlbum.imageUrl}
          alt={currentAlbum.title}
          className="w-[240px] h-[240px] shadow-xl rounded"
        />
        <div className="flex flex-col truncate gap-1 lg:gap-4 items-center lg:items-start ">
          <p className="text-sm font-medium">Album</p>
          <h1 className="text-lg sm:text-4xl font-bold truncate">
            {currentAlbum.title}
          </h1>
          <span className="font-medium text-zinc-400 truncate">
            {currentAlbum.artist}
          </span>
          <div className="flex items-center gap-2 text-sm text-zinc-400 truncate">
            <span className="truncate">
              • {currentAlbum.songs.length} songs
            </span>
            <span className="truncate">• {currentAlbum?.releaseYear}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
