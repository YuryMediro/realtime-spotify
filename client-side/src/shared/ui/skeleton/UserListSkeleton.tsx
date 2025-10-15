import { Skeleton } from "@/components/kit/skeleton";

export const UserListSkeleton = () => {
  return (
    <div className="flex flex-col items-center justify-center lg:justify-start gap-3 p-3 rounded-lg animate-pulse">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full  bg-zinc-800" />
          <div className="flex-1 lg:block hidden">
            <Skeleton className="h-4 w-24  rounded mb-2" />
            <Skeleton className="h-3 w-32  rounded" />
          </div>
        </div>
      ))}
    </div>
  );
};
