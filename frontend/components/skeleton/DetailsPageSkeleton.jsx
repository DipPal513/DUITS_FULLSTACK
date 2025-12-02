 const DetailsPageSkeletonLoader = () => (
  <div className="min-h-screen mt-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-20">
    <div className="container mx-auto px-4 lg:px-8">
      {/* Back button skeleton */}
      <div className="mb-8">
        <div className="h-10 w-32 bg-gray-200 rounded-lg animate-pulse"></div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content skeleton */}
        <div className="lg:col-span-2 space-y-8">
          {/* Image skeleton */}
          <div className="rounded-xl overflow-hidden border border-gray-200 bg-white shadow-lg">
            <div className="relative h-96 bg-gray-200 animate-pulse"></div>
          </div>
          
          {/* Title skeleton */}
          <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-lg">
            <div className="flex gap-3 mb-6">
              <div className="h-6 w-24 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="h-6 w-32 bg-gray-200 rounded-full animate-pulse"></div>
            </div>
            <div className="h-10 bg-gray-200 rounded-lg mb-4 animate-pulse"></div>
            <div className="h-10 w-3/4 bg-gray-200 rounded-lg mb-6 animate-pulse"></div>
          </div>
          
          {/* Description skeleton */}
          <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-lg">
            <div className="h-8 w-48 bg-gray-200 rounded-lg mb-4 animate-pulse"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
        
        {/* Sidebar skeleton */}
        <div className="space-y-6">
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
            <div className="h-6 w-32 bg-gray-200 rounded mb-6 animate-pulse"></div>
            <div className="space-y-5">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-gray-200 rounded-xl animate-pulse"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-3 w-20 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default DetailsPageSkeletonLoader;