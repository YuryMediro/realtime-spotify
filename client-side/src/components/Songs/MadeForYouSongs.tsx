import { useGetMadeForYouSongsAll } from "@/shared/hooks/ApiHooks/useSongs/useSongs";
import { ScrollArea } from "../kit/scroll-area";
import { Songs } from "./Songs";

export const MadeForYouSongs = () => {
  const { isLoading, madeForYouSongsAll } = useGetMadeForYouSongsAll();

  return (
    <div className="rounded-xl overflow-hidden h-full bg-gradient-to-b from-zinc-800 to-zinc-900">
      <ScrollArea className="xl:h-[calc(100vh-160px)] h-full">
        <div className="p-4 sm:p-6">
          <div className="space-y-8">
            <Songs
              songs={madeForYouSongsAll || []}
              title={"Made For You"}
              isLoading={isLoading}
            />
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};
