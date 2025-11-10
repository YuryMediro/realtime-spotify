import { Skeleton } from "@/components/kit/skeleton";

export const UserListMobileSkeleton = () => {
  return (
    <div className="flex flex-col gap-2 animate-pulse">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="flex items-center gap-3 border rounded-lg p-3"
        >
          <Skeleton className="h-10 w-10 rounded-full  bg-zinc-700" />
          <div className="flex-1">
            <Skeleton className="h-4 w-24  rounded mb-2 bg-zinc-700" />
            <Skeleton className="h-3 w-full  rounded bg-zinc-700" />
          </div>
        </div>
      ))}
    </div>
  );
};
