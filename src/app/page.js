import BlogCard from "@/components/custom/blogCard";
import BlogGrid from "@/components/custom/blogGrid";
import Carousel from "@/components/custom/carousel";
import Filter from "@/components/custom/filter";
import Footer from "@/components/custom/footer";
import Header from "@/components/custom/header";
import IntroSection from "@/components/custom/introSection";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Carousel />
      <Filter />
      <BlogGrid />
    </>
  );
}
