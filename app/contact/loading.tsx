import { Skeleton } from "@/components/ui/skeleton";

export default function ContactLoading() {
  return (
    <div className="min-h-screen bg-ivory">
      {/* Header skeleton */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black h-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          <Skeleton className="h-8 w-48 bg-gold/20" />
          <div className="hidden lg:flex space-x-8">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-6 w-16 bg-white/20" />
            ))}
          </div>
          <Skeleton className="h-10 w-32 bg-gold/20" />
        </div>
      </div>

      {/* Hero skeleton */}
      <div className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Skeleton className="h-16 w-3/4 mx-auto mb-6" />
          <Skeleton className="h-6 w-2/3 mx-auto" />
        </div>
      </div>

      {/* Contact methods skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-6 bg-white rounded-lg shadow-lg">
              <Skeleton className="w-16 h-16 rounded-full mx-auto mb-4" />
              <Skeleton className="h-6 w-24 mx-auto mb-2" />
              <Skeleton className="h-4 w-32 mx-auto mb-3" />
              <Skeleton className="h-4 w-28 mx-auto mb-2" />
              <Skeleton className="h-3 w-36 mx-auto" />
            </div>
          ))}
        </div>
      </div>

      {/* Form skeleton */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="p-8 bg-white shadow-xl rounded-lg">
          <Skeleton className="h-8 w-64 mx-auto mb-6" />
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <Skeleton className="h-4 w-20 mb-2" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div>
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
            {[1, 2, 3, 4].map((i) => (
              <div key={i}>
                <Skeleton className="h-4 w-32 mb-2" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}