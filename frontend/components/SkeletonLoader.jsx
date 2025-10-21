
export function SkeletonLoader() {
  return (
    <div className="rounded-xl border border-border overflow-hidden bg-card shadow-lg animate-pulse">
      {/* Image Skeleton */}
      <div className="h-56 bg-muted" />
      
      {/* Content Section */}
      <div className="p-6 space-y-4">
        {/* Title Lines */}
        <div className="space-y-2">
          <div className="h-5 bg-muted rounded w-3/4" />
          <div className="h-5 bg-muted rounded w-1/2" />
        </div>
        
        {/* Description Lines */}
        <div className="space-y-2">
          <div className="h-4 bg-muted rounded w-full" />
          <div className="h-4 bg-muted rounded w-5/6" />
        </div>

        {/* Info Boxes */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <div className="h-20 bg-muted rounded-lg" />
          <div className="h-20 bg-muted rounded-lg" />
        </div>

        {/* Button Skeleton */}
        <div className="h-11 bg-muted rounded-lg" />
      </div>
    </div>
  );
}

