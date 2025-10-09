import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const SingleBlogSkeleton = () => {
  return (
    <div className="lg:pl-20 pl-5 pr-5 lg:pr-0 single-blog-page relative overflow-hidden">
      <div className="flex lg:flex-row flex-col-reverse lg:gap-20 min-h-screen">
        <div className="basis-[55vw] lg:py-20 py-10">
          <div className="flex flex-col gap-10 lg:mb-20 mb-10 border-b border-bg-gray-700 lg:pb-20 pb-10">
            <Skeleton className="h-6 w-32 mb-2 bg-gray-200 dark:bg-gray-700" />
            <Skeleton className="h-32 w-3/4 mb-4 bg-gray-200 dark:bg-gray-700" />
            <div className="flex gap-2">
              <Skeleton className="h-8 w-20 rounded bg-gray-200 dark:bg-gray-700" />
              <Skeleton className="h-8 w-20 rounded bg-gray-200 dark:bg-gray-700" />
              <Skeleton className="h-8 w-20 rounded bg-gray-200 dark:bg-gray-700" />
            </div>
          </div>
          <div className="prose space-y-4">
            <Skeleton className="h-6 w-5/6 bg-gray-200 dark:bg-gray-700" />
            <Skeleton className="h-6 w-2/3 bg-gray-200 dark:bg-gray-700" />
            <Skeleton className="h-6 w-3/4 bg-gray-200 dark:bg-gray-700" />
            <Skeleton className="h-6 w-1/2 bg-gray-200 dark:bg-gray-700" />
            <Skeleton className="h-6 w-4/5 bg-gray-200 dark:bg-gray-700" />
          </div>
        </div>
        <div className="hidden lg:block basis-[45vw] h-[700px] w-[35vw] fixed top-0 -z-10 right-0 overflow-hidden">
          <Skeleton className="object-cover w-full h-full rounded bg-gray-200 dark:bg-gray-700" style={{ minHeight: 700 }} />
        </div>
        <div className="lg:hidden mt-5">
          <Skeleton className="object-cover w-full h-[300px] rounded bg-gray-200 dark:bg-gray-700" />
        </div>
      </div>
    </div>
  );
}

export default SingleBlogSkeleton