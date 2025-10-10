import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'


const SingleBlogSkeleton = () => {
  return (
    <div className="xl:pl-20 pl-5 pr-5 xl:pr-0 single-blog-page relative overflow-hidden">
      <div className="flex xl:flex-row flex-col-reverse xl:gap-20 min-h-screen">
        <div className="basis-[55vw] lg:py-20 py-10">
          <div className="content flex flex-col gap-10 lg:mb-20 mb-10 border-b border-black lg:pb-20 pb-10">
            <Skeleton className="h-6 w-32 mb-2 bg-gray-200 dark:bg-gray-700" />
            <Skeleton className="h-16 w-3/4 mb-4 bg-gray-200 dark:bg-gray-700" />
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
        <div className="hidden xl:block basis-[45vw] h-screen w-[35vw] fixed top-0 -z-10 right-0 overflow-hidden">
          <Skeleton className="object-cover w-full h-full rounded bg-gray-200 dark:bg-gray-700" style={{ minHeight: 700 }} />
        </div>
        <div className="xl:hidden mt-5 relative h-[300px] lg:h-[500px] w-full overflow-hidden right-0">
          <Skeleton className="object-cover w-full h-full rounded bg-gray-200 dark:bg-gray-700" />
        </div>
      </div>
    </div>
  );
}

export default SingleBlogSkeleton