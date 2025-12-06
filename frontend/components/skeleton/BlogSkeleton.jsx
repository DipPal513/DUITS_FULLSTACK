export function BlogSkeleton() {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
          {/* Image Skeleton */}
          <div className="h-48 w-full bg-slate-200 dark:bg-slate-800 animate-pulse" />
          <div className="p-6 space-y-3">
            {/* Title Skeleton */}
            <div className="h-6 w-3/4 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
            {/* Text Skeleton */}
            <div className="h-4 w-full bg-slate-100 dark:bg-slate-800/50 rounded animate-pulse" />
            <div className="h-4 w-2/3 bg-slate-100 dark:bg-slate-800/50 rounded animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
}