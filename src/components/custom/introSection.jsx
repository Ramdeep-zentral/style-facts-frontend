import Image from "next/image";
import React from "react";


const IntroSection = ({tags}) => {
  return (
    <section
      className="h-[90vh] flex flex-col items-center relative justify-center bg-cover bg-fixed"
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
      <div className="absolute top-10 right-20 text-white">
        <a href="/guest-post">
          <h5>Guest Post</h5>
        </a>
      </div>
      <Image src="/logo.svg" alt="Logo" width={300} height={300} />
      <div className="flex flex-col gap-1 absolute bottom-10 right-20 text-white">
        {tags.map((tag, index) => (
          <h5 key={index}>{tag}</h5>
        ))}
      </div>
    </section>
  );
};

export default IntroSection;
