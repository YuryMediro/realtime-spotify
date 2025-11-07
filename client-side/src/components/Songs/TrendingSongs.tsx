import { Songs } from "./Songs";
import { ScrollArea } from "../kit/scroll-area";
import { useGetTrendingSongsAll } from "@/shared/hooks/ApiHooks/useSongs/useSongs";

export const TrendingSongs = () => {
  const { isLoading, trendingSongsAll } = useGetTrendingSongsAll();
  return (
    <div className="rounded-xl overflow-hidden h-full bg-gradient-to-b from-zinc-800 to-zinc-900">
      <ScrollArea className="xl:h-[calc(100vh-160px)] h-full">
        <div className="p-4 sm:p-6">
          <div className="space-y-8">
            <Songs
              songs={trendingSongsAll || []}
              title={"Trending"}
              isLoading={isLoading}
            />
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};
