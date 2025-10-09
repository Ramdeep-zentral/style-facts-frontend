'use client';

import React, { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";

const images = [
  "/catwalk-1840941_1280.jpg",
  "/pexels-kish-1488463.jpg",
  "/pexels-valeriya-965989.jpg",
];

const Carousel = () => {
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);
  const timeoutRef = useRef();

  useEffect(() => {
    gsap.fromTo(
      ".carousel-text",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.5,
        ease: "power3.out",
      }
    );
  }, []);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setFade(false);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % images.length);
        setFade(true);
      }, 600); // fade out duration
    }, 4000); // time per image
    return () => clearTimeout(timeoutRef.current);
  }, [current]);

  return (
    <div className="lg:h-[95vh] h-[50vh] relative overflow-hidden">
      {/* Background image with fade effect */}
      <div
        className={`absolute inset-0 bg-center bg-cover lg:bg-fixed transition-opacity duration-700 ease-in-out ${fade ? 'opacity-100' : 'opacity-0'}`}
        style={{ backgroundImage: `url('${images[current]}')`, zIndex: 1 }}
      />
      <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
      <div className="container carousel-text flex flex-col gap-2 justify-center items-center h-full text-white z-20 relative">
        <h5>welcome to</h5>
        <h1 className="font-carefree-serif-italic">
          the <span className="uppercase font-carefree-serif">Style Facts </span> blog
        </h1>
        <div className=" max-w-lg text-center">
          <p>
        This blog is dedicated to exploring style, fashion, and creative storytelling. I share thoughtful insights, trends, and ideas that inspire purposeful living and timeless elegance.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
