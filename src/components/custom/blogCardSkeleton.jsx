import React from 'react';
import { Skeleton } from '../ui/skeleton';

const BlogCardSkeleton = ({ grid }) => {
  return (
    <>
      {grid === true ? (
        <div className="flex items-center gap-6">
          <div className="basis-1/2">
            <Skeleton className=" w-[300px] h-[400px] object-cover bg-gray-200 animate-pulse" />
          </div>
          <div className="basis-1/2 flex flex-col gap-4">
            <Skeleton className="text-sm font-bodoni-moda bg-gray-200 h-4 w-24 rounded animate-pulse" />
            <Skeleton className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
            <Skeleton className="text-lg bg-gray-200 h-4 w-64 rounded animate-pulse" />
          </div>
        </div>
      ) : (
        <div className="single-news-item">
          <div className="h-[400px] relative">
            <Skeleton className="object-cover w-full h-full bg-gray-200 animate-pulse" />
          </div>
          <div className="text-wrapper">
            <Skeleton className="text-sm font-bodoni-moda bg-gray-200 h-4 w-24 rounded animate-pulse" />
            <Skeleton className="h-6 w-40 bg-gray-200 rounded animate-pulse" />
            <Skeleton className="text-lg bg-gray-200 h-4 w-64 rounded animate-pulse" />
          </div>
        </div>
      )}
    </>
  );
};

export default BlogCardSkeleton;