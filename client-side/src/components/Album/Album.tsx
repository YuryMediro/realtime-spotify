import { musicStore } from "@/entities/store/music-store";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { ScrollArea } from "../kit/scroll-area";
import { AlbumContent } from "./AlbumContent/AlbumContent";
import { PlayButton } from "./AlbumContent/PlayButton";
import { AlbumTable } from "./AlbumContent/AlbumTable";
import { observer } from "mobx-react-lite";
import { useDominantColor } from "@/shared/hooks/useDominantColor";

export const Album = observer(() => {
  const { albumId } = useParams();
  const { fetchAlbumsById, isLoading, currentAlbum } = musicStore;
  const dominantColor = useDominantColor(currentAlbum?.imageUrl);
  useEffect(() => {
    if (albumId) fetchAlbumsById(albumId);
  }, [albumId]);

  if (isLoading) return null;

  return (
    <div className="h-full">
      <ScrollArea className="xl:h-[calc(100vh-152px)] ">
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
          <PlayButton />

          <AlbumTable currentAlbum={currentAlbum} />
        </div>
      </ScrollArea>
    </div>
  );
});
