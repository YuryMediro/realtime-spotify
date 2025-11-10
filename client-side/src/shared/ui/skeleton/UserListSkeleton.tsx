import { Skeleton } from "@/components/kit/skeleton";

export const UserListSkeleton = () => {
  return (
    <div className="flex flex-col items-center justify-center lg:justify-start gap-2 rounded-lg animate-pulse ">
      {Array.from({ length: 7 }).map((_, index) => (
        <div
          key={index}
          className="flex items-center space-x-4 border rounded-lg p-2.5 w-[210px]"
        >
          <Skeleton className="h-10 w-10 rounded-full  bg-zinc-700" />
          <div className="flex-1 lg:block hidden">
            <Skeleton className="h-4 w-24  rounded mb-2 bg-zinc-700" />
            <Skeleton className="h-3 w-32  rounded bg-zinc-700" />
          </div>
        </div>
      ))}
    </div>
  );
};
