'use client'

import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export function ProfileSkeletonWithCover() {
  return (
    (<Card className="w-full max-w-3xl mx-auto">
      <div className="relative">
        {/* Cover image skeleton */}
        <Skeleton className="h-48 w-full rounded-t-lg" />
        
        {/* Profile picture skeleton */}
        <div className="absolute bottom-0 left-6 transform translate-y-1/2">
          <Skeleton className="h-32 w-32 rounded-full border-4 border-background" />
        </div>
      </div>
      <CardContent className="pt-20 px-6 space-y-6">
        {/* Name and bio */}
        <div className="space-y-2">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-48" />
        </div>
        
        {/* Bio or description */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/6" />
        </div>
        
        {/* Stats or quick info */}
        <div className="flex justify-between">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-24" />
        </div>
        
        {/* Additional profile information */}
        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </CardContent>
    </Card>)
  );
}