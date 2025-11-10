import { Skeleton } from "@/components/kit/skeleton";

export const FriendsSkeleton = () => {
  return (
    <div className="flex flex-col  justify-start gap-4 p-3 rounded-lg animate-pulse">
      {Array.from({ length: 10 }).map((_, index) => (
        <div key={index} className="flex items-center space-x-3">
          <Skeleton className="h-10 w-10 rounded-full  bg-zinc-700" />
          <div className="flex-1 block ">
            <Skeleton className="h-4 w-34  rounded mb-2 bg-zinc-700" />
            <Skeleton className="h-3 w-20  rounded bg-zinc-700" />
          </div>
        </div>
      ))}
    </div>
  );
};
