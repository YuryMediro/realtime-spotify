import { musicStore } from "@/entities/store/music-store";
import { useEffect } from "react";
import { Songs } from "./Songs";
import { ScrollArea } from "../kit/scroll-area";
import { observer } from "mobx-react-lite";

export const TrendingSongs = observer(() => {
  const { fetchTrendingSongsAll, isLoading, trendingSongs } = musicStore;
  useEffect(() => {
    fetchTrendingSongsAll();
  }, []);
  return (
    <div className="rounded-md overflow-hidden h-full bg-gradient-to-b from-zinc-800 to-zinc-900">
      <ScrollArea className="h-[calc(100vh-180px)]">
        <div className="p-4 sm:p-6">
          <div className="space-y-8">
            <Songs
              songs={trendingSongs}
              title={"Trending"}
              isLoading={isLoading}
            />
          </div>
        </div>
      </ScrollArea>
    </div>
  );
});
