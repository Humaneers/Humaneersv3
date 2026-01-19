import { Skeleton } from "./ui/skeleton";

export function PageLoader() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center bg-transparent">
      <div className="max-w-4xl w-full space-y-4 px-6">
        <Skeleton className="h-12 w-full bg-gray-200">
          <div className="h-full w-1/4 bg-brand-copper/20 rounded animate-pulse" />
        </Skeleton>
        <Skeleton className="h-64 w-full bg-gray-200">
          <div className="h-4 w-3/4 bg-brand-copper/20 rounded mt-4 ml-4 animate-pulse" />
        </Skeleton>
        <Skeleton className="h-32 w-full bg-gray-200" />
      </div>
    </div>
  );
}
