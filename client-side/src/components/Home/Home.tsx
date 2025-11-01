import { ScrollArea } from "../kit/scroll-area";
import { FeaturedSection } from "./HomeContent/FeaturedSection";
import { musicStore } from "@/entities/store/music-store";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { SectionSongs } from "./HomeContent/SectionSongs";
import { playerStore } from "@/entities/store/player-store";

export const Home = observer(() => {
  const {
    fetchFeaturedSongs,
    fetchMadeForYouSongs,
    fetchTrendingSongs,
    featuredSongs,
    madeForYouSongs,
    trendingSongs,
    isLoading,
  } = musicStore;

  const { initializeQueue } = playerStore;
  useEffect(() => {
    (fetchFeaturedSongs(), fetchMadeForYouSongs(), fetchTrendingSongs());
  }, []);
  useEffect(() => {
    if (
      madeForYouSongs.length > 0 &&
      trendingSongs.length > 0 &&
      featuredSongs.length > 0
    ) {
      const allSongs = [...madeForYouSongs, ...trendingSongs, ...featuredSongs];

      initializeQueue(allSongs);
    }
  }, [initializeQueue, madeForYouSongs, trendingSongs, featuredSongs]);

  return (
    <main className="rounded-xl overflow-hidden h-full bg-gradient-to-b from-zinc-800 to-zinc-900">
      <ScrollArea className="xl:h-[calc(100vh-165px)] h-full">
        <div className="p-4 sm:p-6 ">
          <h1 className="text-2xl sm:text-3xl font-bold mb-6">
            Good afternoon
          </h1>
          <FeaturedSection
            featuredSongs={featuredSongs}
            isLoading={isLoading}
          />
          <div className="space-y-8">
            <SectionSongs
              songs={madeForYouSongs}
              title={"Made For You"}
              isLoading={isLoading}
              link={"/made-fo-you-songs"}
            />
            <SectionSongs
              songs={trendingSongs}
              title={"Trending"}
              isLoading={isLoading}
              link={"/trending-songs"}
            />
          </div>
        </div>
      </ScrollArea>
    </main>
  );
});
