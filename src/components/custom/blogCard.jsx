import Image from "next/image";
import React from "react";


const BlogCard = ({ imageUrl, title, date, excerpt, grid }) => {

  return (
    <>
      {grid === true ? (
        <div className="blog-wrapper flex lg:flex-row flex-col items-center gap-6">
          <div className="basis-1/2 relative h-[400px] 2xl:h-[600px] w-[400px] group overflow-hidden border border-black dark:border-white">
            {imageUrl && (
              <Image src={imageUrl} alt={title} fill className="blog-image" />
            )}
          </div>
          <div className="basis-1/2 flex flex-col gap-4">
            <div className="blog-published-date">{date}</div>
            <h2>{title}</h2>

            <div className="text-lg">{excerpt}</div>
          </div>
        </div>
      ) : (
        <div className="blog-wrapper single-news-item">
          <div className="blog-image-style">
            {imageUrl && (
              <Image src={imageUrl} alt={title} fill className="blog-image" />
            )}
          </div>
          <div className="text-wrapper">
            <div className="blog-published-date">{date}</div>
            <h3>{title}</h3>
            <div className="text-lg">{excerpt}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default BlogCard;
