"use client";
import React, { use, useEffect, useState } from "react";
import GlobalApi from "@/service/GlobalApi";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Markdown from "react-markdown";
import SingleBlogSkeleton from "../_components/singleBlogSkeleton";
import gsap from "gsap";
import RecommendBlogs from "../_components/recommendBlogs";

const SingleBlogPage = ({ params }) => {
  useEffect(() => {
    gsap.fromTo(
      ".single-blog-page ",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.5,
        ease: "power3.out",
      }
    );
  }, []);
  const { cname } = React.use(params);
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const resp = await GlobalApi.GetSingleBlog(cname);
        setBlog(resp.data.data[0]);
        console.log(resp.data.data[0]);
      } catch (error) {
        setBlog(null);
        console.error("Error fetching single blog:", error);
      }
    };
    fetchBlog();
  }, [cname]);

  if (!blog)
    return (
      <div>
        <SingleBlogSkeleton />
      </div>
    );

  return (
    <>
    <div className="xl:pl-20 pl-5 pr-5 xl:pr-0 single-blog-page relative overflow-hidden">
      <div className="flex xl:flex-row flex-col-reverse xl:gap-20 min-h-screen">
        <div className="basis-[55vw] lg:py-20 py-10">
          <div className="content flex flex-col gap-10 lg:mb-20 mb-10 border-b border-black lg:pb-20 pb-10">
            <div className="blog-published-date">{blog.publishedDate}</div>
            <h1>{blog.title}</h1>
            {blog.tags && (
              <div className="flex gap-2">
                {blog.tags.map((tag) => (
                  <Button variant="outline" size="sm" key={tag.id}>
                    {tag.name}
                  </Button>
                ))}
              </div>
            )}
          </div>
          <div className="prose">
            <Markdown>{blog.content}</Markdown>
          </div>
        </div>

        <div className="hidden xl:block basis-[45vw] h-screen  w-[35vw] fixed top-0 -z-10 right-0 overflow-hidden">
          <Image
            src={blog.image?.url}
            alt={blog.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="xl:hidden mt-5 relative h-[300px] lg:h-[500px] w-full overflow-hidden right-0">
          <Image
            src={blog.image?.url}
            alt={blog.title}
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
    <div className="py-20 bg-black text-white">
      <RecommendBlogs currentArticle={blog} />
    </div>
    </>
  );
};

export default SingleBlogPage;
