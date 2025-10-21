import { Skeleton } from "@/components/kit/skeleton";

export const PlayListSkeleton = () => {
  return (
    <div className="flex flex-col gap-3 p-2">
      {Array.from({ length: 7 }).map((_, index) => (
        <div key={index} className="flex items-center space-x-4 ">
          <Skeleton className="h-12 w-12 rounded-md bg-zinc-700" />
          <div className="space-y-2 hidden md:block">
            <Skeleton className="h-4 w-[150px] bg-zinc-700" />
            <Skeleton className="h-3 w-[100px] bg-zinc-700" />
          </div>
        </div>
      ))}
    </div>
  );
};
