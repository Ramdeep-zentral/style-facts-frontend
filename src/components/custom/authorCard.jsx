import Image from "next/image";
import React from "react";

const AuthorCard = () => {
  return (
    <div className="flex flex-col gap-3 author-wrapper items-end ml-auto">
      <div className="w-[200px] h-[260px] object-cover relative">
        <Image
          src="/PAT_7326_1-min.jpg"
          alt="author"
          fill
          className="border border-black"
        />
      </div>
      <div className="flex flex-col gap-3 author-wrapper items-end ml-auto">
        <div className="">
          <div className="text-center">
            <h5>Welcome to the blog</h5>
            <div className=" font-carefree-serif">
             A space where fashion, creativity, and intention meet. I write about style, design, and inspiration — focusing on building a life and aesthetic driven by meaning and beauty.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorCard;
