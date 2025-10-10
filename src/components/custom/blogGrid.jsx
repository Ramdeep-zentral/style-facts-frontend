"use client";
import React, { use, useEffect, useState } from "react";
import BlogCard from "./blogCard";
import Link from "next/link";
import { Button } from "../ui/button";
import GlobalApi from "@/service/GlobalApi";
import AuthorCard from "./authorCard";
import BlogCardSkeleton from "./blogCardSkeleton";

const BlogGrid = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visibleCount, setVisibleCount] = useState(8);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const resp = await GlobalApi.GetBlogs();
  // Sort blogs by publishedDate descending (most recent first)
  const sortedBlogs = [...resp.data.data].sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate));
  setBlogs(sortedBlogs);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      toast.error("Failed to fetch blogs");
      setLoading(false);
    }
  };

  const loadMoreBlogs = () => {
    setVisibleCount((prev) => prev + 4);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);
  return (
    <>
      <div className="hidden lg:block">
        <div className=" py-12">
          <div className="text-center">
            <h2>The Stories</h2>
          </div>

          {/* First 3 blogs in 3 columns */}
          <div className="pb-28 xl:px-40">
            <div className="container">
              <ul className="grid lg:grid-cols-3 gap-20 mt-12 list-none p-0 m-0">
                {loading ? (
                  <>
                    <BlogCardSkeleton />
                    <BlogCardSkeleton />
                    <BlogCardSkeleton />
                  </>
                ) : (
                  blogs.slice(0, Math.min(3, visibleCount)).map((blog) => (
                    <li key={blog.id} className="m-0 p-0">
                      <Link href={`/blog/${blog.slug}`}>
                        <BlogCard
                          title={blog.title}
                          date={blog.publishedDate}
                          imageUrl={blog.image?.url}
                        />
                      </Link>
                    </li>
                  ))
                )}
              </ul>
            </div>
          </div>

          {/* Rest of the blogs in a single column with new style */}
          <div className="lg:px-10 xl:px-40 border-y border-black">
            <div className="flex xl:flex-row flex-col justify-between my-28 gap-40">
      
                <ul className="flex flex-col gap-20 list-none p-0 m-0">
                  {loading ? (
                    <>
                      <BlogCardSkeleton grid={true} />
                      <BlogCardSkeleton grid={true} />
                    </>
                  ) : (
                    blogs.slice(3, Math.min(5, visibleCount)).map((blog) => (
                      <li key={blog.id} className="m-0 p-0">
                        <Link href={`/blog/${blog.slug}`}>
                          <BlogCard
                            key={blog.id}
                            title={blog.title}
                            date={blog.publishedDate}
                            imageUrl={blog.image?.url}
                            excerpt={blog.excerpt}
                            grid={true}
                          />
                        </Link>
                      </li>
                    ))
                  )}
                </ul>
              
             
            </div>
          </div>

          {/* show remaining blogs in 3 columns only if there are 6 or more blogs */}
          {blogs.length >= 6 && visibleCount > 5 && (
            <div className="border-b border-black py-28 xl:px-40">
              <div className="container">
                <ul className="grid grid-cols-3 gap-20 mt-12 list-none p-0 m-0">
                  {loading ? (
                    <>
                      <BlogCardSkeleton />
                      <BlogCardSkeleton />
                      <BlogCardSkeleton />
                    </>
                  ) : (
                    blogs.slice(5, visibleCount).map((blog) => (
                      <li key={blog.id} className="m-0 p-0">
                        <Link href={`/blog/${blog.slug}`}>
                          <BlogCard
                            key={blog.id}
                            title={blog.title}
                            date={blog.publishedDate}
                            imageUrl={blog.image?.url}
                          />
                        </Link>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            </div>
          )}

          {visibleCount < blogs.length && (
            <div className="m-auto text-center mt-10">
              <Button variant="secondary" className="mx-auto mt-6" onClick={loadMoreBlogs}>Load More</Button>
            </div>
          )}
        </div>
      </div>
      <div className="lg:hidden">
        <div className="pb-28 lg:px-40">
          <div className="container">
            <ul className="grid lg:grid-cols-3 gap-10 list-none p-0 m-0">
              {blogs.slice(0, visibleCount).map((blog) => (
                <li key={blog.id} className="m-0 p-0">
                  <Link href={`/blog/${blog.slug}`}>
                    {loading ? (
                      <BlogCardSkeleton />
                    ) : (
                      <BlogCard
                        title={blog?.title}
                        date={blog?.publishedDate}
                        imageUrl={blog?.image?.url}
                      />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogGrid;
