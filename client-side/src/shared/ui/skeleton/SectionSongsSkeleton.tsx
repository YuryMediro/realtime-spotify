import { Skeleton } from "@/components/kit/skeleton";

export const SectionSongsSkeleton = () => {
  return (
    <div className=" mb-8">
      <div className=" hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="bg-zinc-800/40 p-4 rounded-md animate-pulse"
          >
            <Skeleton className="aspect-square rounded-md bg-zinc-700 mb-4" />

            <Skeleton className="h-4 bg-zinc-700 rounded w-3/4 mb-2" />
            <Skeleton className="h-4 bg-zinc-700 rounded w-1/2" />
          </div>
        ))}
      </div>
      <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center bg-zinc-800/50 rounded-md overflow-hidden animate-pulse"
          >
            <Skeleton className="w-16 sm:w-20 h-16 sm:h-20 bg-zinc-700 flex-shrink-0" />
            <div className="flex-1 p-4">
              <Skeleton className="h-4 bg-zinc-700 rounded w-1/2 mb-2" />
              <Skeleton className="h-4 bg-zinc-700 rounded w-3/4 mb-2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
