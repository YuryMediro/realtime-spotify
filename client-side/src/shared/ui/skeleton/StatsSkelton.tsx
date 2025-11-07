import { Card } from "@/components/kit/card";
import { Skeleton } from "@/components/kit/skeleton";

export const StatsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 animate-pulse">
      {Array.from({ length: 4 }).map((_, index) => (
        <Card
          key={index}
          className="bg-zinc-800/50 border-zinc-700/50 hover:bg-zinc-800/80 transition-colors"
        >
          <div className="p-6 flex items-center gap-4">
            <Skeleton className="h-13 w-13 rounded-lg  bg-zinc-700" />
            <div className="flex-1">
              <Skeleton className="h-4 w-24  rounded mb-2 bg-zinc-700" />
              <Skeleton className="h-3 w-12  rounded bg-zinc-700" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
