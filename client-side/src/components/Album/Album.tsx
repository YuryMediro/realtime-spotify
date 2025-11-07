import { useParams } from "react-router-dom";
import { ScrollArea } from "../kit/scroll-area";
import { AlbumContent } from "./AlbumContent/AlbumContent";
import { PlayButton } from "./AlbumContent/PlayButton";
import { AlbumTable } from "./AlbumContent/AlbumTable";
import { useDominantColor } from "@/shared/hooks/useDominantColor";
import { useGetAlbumsById } from "@/shared/hooks/ApiHooks/useAlbums/useAlbums";

export const Album = () => {
  const { albumId } = useParams();
  const { albums: currentAlbum } = useGetAlbumsById(albumId!);
  const dominantColor = useDominantColor(currentAlbum?.imageUrl);

  if (!currentAlbum) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-zinc-100 mb-2">
            Album Not Found
          </h2>
          <p className="text-zinc-400">
            The album you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full">
      <ScrollArea className="xl:h-[calc(100vh-152px)] h-full">
        <div className="min-h-full ">
          <div
            className="absolute inset-0 pointer-events-none rounded-xl"
            style={{
              backgroundColor: dominantColor,
              backgroundImage: `linear-gradient(135deg, ${dominantColor} 0%, rgba(24, 24, 27, 0.9) 100%)`,
            }}
            aria-hidden="true"
          />
          <AlbumContent currentAlbum={currentAlbum} />
          <PlayButton currentAlbum={currentAlbum} />
          <AlbumTable currentAlbum={currentAlbum} />
        </div>
      </ScrollArea>
    </div>
  );
};
