"use client";
import BlogCard from "@/components/custom/blogCard";
import BlogCardSkeleton from "@/components/custom/blogCardSkeleton";
import BlogGrid from "@/components/custom/blogGrid";
import GlobalApi from "@/service/GlobalApi";
import Link from "next/link";
import React, { use, useEffect, useState } from "react";

const PostByCategory = ({ params }) => {
  const { category } = React.use(params);
  const [postsList, setPostsList] = useState([]);
  const [loading, setLoading] = useState(false);

  const getPostList = async (category) => {
    try {
      setLoading(true);
      const resp = await GlobalApi.GetBlogsByCategory(category);
      setPostsList(resp.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching blogs by category:", error);
      setPostsList([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    getPostList(category);
  }, [category]);

  return (
    <div>
        {!loading && postsList.length === 0 && (
        <div>No posts found.</div>
      )}
      {/* Render your posts here */}
      <div className="grid lg:grid-cols-3 gap-10">
        {loading
          ? <BlogCardSkeleton />
          : postsList.map((post) => (
              <Link href={`/blog/${post.slug}`} key={post.id}>
                <BlogCard
                  key={post.id}
                  imageUrl={post.image?.url}
                  title={post.title}
                  date={post.publishedDate}
                />
              </Link>
            ))}
      </div>
    
    </div>
  );
};

export default PostByCategory;

