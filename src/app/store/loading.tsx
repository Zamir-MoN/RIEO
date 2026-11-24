export default function StoreLoading() {
  return (
    <div className="flex flex-col min-h-screen pt-16 md:pt-32 pb-24 bg-[#050505] text-white">
      <div className="max-w-7xl mx-auto px-4 w-full relative z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] bg-white/5 blur-[100px] sm:blur-[120px] rounded-full pointer-events-none" />
        
        {/* Header Skeleton */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 lg:mb-24 gap-8 relative z-10">
          <div>
            {/* Back to Home Skeleton */}
            <div className="w-32 h-4 bg-white/10 rounded animate-pulse mb-8" />
            
            {/* Title Skeleton */}
            <div className="w-64 h-16 sm:w-96 sm:h-24 bg-white/10 rounded-lg animate-pulse mb-4" />
            
            {/* Subtitle Skeleton */}
            <div className="w-48 h-4 bg-white/10 rounded animate-pulse" />
          </div>

          {/* Search Input Skeleton */}
          <div className="w-full md:w-64 h-12 bg-white/10 rounded-full animate-pulse" />
        </div>

        {/* Grid Skeleton */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8 relative z-10">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="group relative rounded-3xl overflow-hidden bg-[#0A0A0A] border border-white/5 shadow-2xl flex flex-col">
              {/* Video Skeleton */}
              <div className="relative w-full aspect-[4/5] bg-white/5 animate-pulse" />
              
              {/* Content Skeleton */}
              <div className="p-6 sm:p-8 flex flex-col gap-6 relative z-20">
                <div className="flex justify-between items-start gap-4">
                  {/* Title Skeleton */}
                  <div className="w-1/2 h-6 bg-white/10 rounded animate-pulse" />
                  
                  {/* Price Skeleton */}
                  <div className="w-16 h-8 bg-white/10 rounded-lg animate-pulse shrink-0" />
                </div>
                
                {/* Button Skeleton */}
                <div className="w-full h-12 rounded-xl bg-white/10 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
