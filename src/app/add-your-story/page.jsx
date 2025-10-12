"use client";
import Image from "next/image";
import StoryForm from "./_components/storyForm";

// Add Your Story Page
const AddYourStoryPage = () => (
  <div className="">
    <div className="relative h-[300px] md:h-[400px] xl:h-[450px] overflow-hidden">
      <Image
        src="/raden-prasetya-EvjmSg1xurI-unsplash.jpg"
        layout="fill"
        className="absolute inset-0 w-full h-full object-cover object-center"
        alt="Add Your Story"
      />
        </div>
      <div className="container xl:px-40 py-20 bg-white dark:bg-black">
        <StoryForm />
      </div>
  
  </div>
);

export default AddYourStoryPage;
