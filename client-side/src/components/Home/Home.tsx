import { ScrollArea } from "../kit/scroll-area";
import { FeaturedSection } from "./HomeContent/FeaturedSection";
import { useEffect } from "react";
import { SectionSongs } from "./HomeContent/SectionSongs";
import { playerStore } from "@/entities/store/player-store";
import {
  useGetFeaturedSongs,
  useGetMadeForYouSongs,
  useGetTrendingSongs,
} from "@/shared/hooks/ApiHooks/useSongs/useSongs";

export const Home = () => {
  const { featuredSongs, isLoading: isLoadingFeatured } = useGetFeaturedSongs();
  const { madeForYouSongs, isLoading: isLoadingMadeForYou } =
    useGetMadeForYouSongs();
  const { trendingSongs, isLoading: isLoadingTrending } = useGetTrendingSongs();

  const { initializeQueue } = playerStore;

  useEffect(() => {
    if (!madeForYouSongs || !trendingSongs || !featuredSongs) return;
    const allSongs = [...madeForYouSongs, ...trendingSongs, ...featuredSongs];
    if (allSongs.length > 0) {
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
            featuredSongs={featuredSongs || []}
            isLoading={isLoadingFeatured}
          />
          <div className="space-y-8">
            <SectionSongs
              songs={madeForYouSongs || []}
              title={"Made For You"}
              isLoading={isLoadingMadeForYou}
              link={"/made-fo-you-songs"}
            />
            <SectionSongs
              songs={trendingSongs || []}
              title={"Trending"}
              isLoading={isLoadingTrending}
              link={"/trending-songs"}
            />
          </div>
        </div>
      </ScrollArea>
    </main>
  );
};
