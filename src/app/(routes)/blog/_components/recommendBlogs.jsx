import BlogCard from "@/components/custom/blogCard";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import Link from "next/link";
import React, { useState } from "react";

const RecommendBlogs = ({ currentArticle }) => {
  const [recommended, setRecommended] = useState([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const fetchRecommendations = async () => {
    setLoading(true);
    const res = await fetch("/api/recommend-blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentArticle }),
    });
    const data = await res.json();
    setRecommended(data.recommendedArticles || []);
    setLoading(false);
    setShow(true);
  };

  return (
    <div className="lg:px-40 px-5">
      {!show && (
        <div className="text-center">
          <Button
            onClick={fetchRecommendations}
            disabled={loading || !currentArticle}
            variant="secondary"
          >
            {loading ? (
              <>
                <Spinner className="inline-block mr-1 align-middle" /> Generating...
              </>
            ) : (
              "Generate AI Related Posts"
            )}
          </Button>
        </div>
      )}
      {show && (
        <>
        <div className="text-center">
            <h2>AI Generated Related Posts</h2>
        </div>
          
          {recommended.length ? (
            <div className="grid lg:grid-cols-3 lg:gap-20 gap-10 mt-20 bg-dark">
              {recommended.map((blog) => (
                <Link href={`/blog/${blog.slug}`} key={blog.id}>
                <BlogCard
                  key={blog.id}
                  title={blog.title}
                  imageUrl={blog.image?.url}
                  date={blog.publishedDate}
                />
                </Link>
              ))}
            </div>
          ) : (
            <div>No recommendations found.</div>
          )}
        </>
      )}
    </div>
  );
};

export default RecommendBlogs;
