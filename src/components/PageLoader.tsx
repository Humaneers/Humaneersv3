import { Skeleton } from "./ui/skeleton";

export function PageLoader() {
  return (
    <div className="w-full flex items-center justify-center py-24">
      <div className="max-w-4xl w-full space-y-4 px-6">
        <Skeleton className="h-12 w-full bg-brand-copper/10">
          <div className="h-full w-1/4 bg-brand-copper/20 rounded animate-pulse" />
        </Skeleton>
        <Skeleton className="h-64 w-full bg-brand-copper/5">
          <div className="h-4 w-3/4 bg-brand-copper/10 rounded mt-4 ml-4 animate-pulse" />
        </Skeleton>
        <Skeleton className="h-32 w-full bg-brand-copper/5" />
      </div>
    </div>
  );
}
