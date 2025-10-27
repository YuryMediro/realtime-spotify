import { observer } from "mobx-react-lite";
import { ScrollArea } from "../kit/scroll-area";
import { Songs } from "./Songs";
import { musicStore } from "@/entities/store/music-store";
import { useEffect } from "react";

export const MadeForYouSongs = observer(() => {
  const { fetchMadeForYouSongsAll, isLoading, madeForYouSongs } = musicStore;
  useEffect(() => {
    fetchMadeForYouSongsAll();
  }, []);
  return (
    <div className="rounded-md overflow-hidden h-full bg-gradient-to-b from-zinc-800 to-zinc-900">
      <ScrollArea className="h-[calc(100vh-180px)]">
        <div className="p-4 sm:p-6">
          <div className="space-y-8">
            <Songs
              songs={madeForYouSongs}
              title={"Made For You"}
              isLoading={isLoading}
            />
          </div>
        </div>
      </ScrollArea>
    </div>
  );
});
