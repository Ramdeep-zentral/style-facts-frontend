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
      setBlogs(resp.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching blogs:", error);
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
          <div className="pb-28 lg:px-40">
            <div className="container">
              <div className="grid lg:grid-cols-3 gap-20 mt-12">
                {loading ? (
                  <>
                    <BlogCardSkeleton />
                    <BlogCardSkeleton />
                    <BlogCardSkeleton />
                  </>
                ) : (
                  blogs.slice(0, Math.min(3, visibleCount)).map((blog) => (
                    <Link href={`/blog/${blog.slug}`} key={blog.id}>
                      <BlogCard
                        title={blog.title}
                        date={blog.publishedDate}
                        imageUrl={blog.image?.url}
                      />
                    </Link>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Rest of the blogs in a single column with new style */}
          <div className="lg:px-40 border-y border-black">
            <div className="flex lg:flex-row flex-col justify-between my-28 gap-40">
              <div className="basis-[80vw]">
                <div className="flex flex-col gap-20">
                  {loading ? (
                    <>
                      <BlogCardSkeleton grid={true} />
                      <BlogCardSkeleton grid={true} />
                    </>
                  ) : (
                    blogs.slice(3, Math.min(5, visibleCount)).map((blog) => (
                      <Link href={`/blog/${blog.slug}`} key={blog.id}>
                        <BlogCard
                          key={blog.id}
                          title={blog.title}
                          date={blog.publishedDate}
                          imageUrl={blog.image?.url}
                          excerpt={blog.excerpt}
                          grid={true}
                        />
                      </Link>
                    ))
                  )}
                </div>
              </div>
              <div className="basis-[20vw]">
                <AuthorCard />
              </div>
            </div>
          </div>

          {/* show remaining blogs in 3 columns only if there are 6 or more blogs */}
          {blogs.length >= 6 && visibleCount > 5 && (
            <div className="border-b border-black py-28 px-40">
              <div className="container">
                <div className="grid grid-cols-3 gap-20 mt-12">
                  {loading ? (
                    <>
                      <BlogCardSkeleton />
                      <BlogCardSkeleton />
                      <BlogCardSkeleton />
                    </>
                  ) : (
                    blogs.slice(5, visibleCount).map((blog) => (
                      <Link href={`/blog/${blog.slug}`} key={blog.id}>
                        <BlogCard
                          key={blog.id}
                          title={blog.title}
                          date={blog.publishedDate}
                          imageUrl={blog.image?.url}
                        />
                      </Link>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {visibleCount < blogs.length && (
            <div className="m-auto text-center mt-10">
              <Button className="mx-auto mt-6" onClick={loadMoreBlogs}>Load More</Button>
            </div>
          )}
        </div>
      </div>
      <div className="lg:hidden">
        <div className="pb-28 lg:px-40">
          <div className="container">
            <div className="grid lg:grid-cols-3 gap-10">
              {blogs.slice(0, visibleCount).map((blog) => (
                <Link href={`/blog/${blog.slug}`} key={blog.id}>
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
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogGrid;
