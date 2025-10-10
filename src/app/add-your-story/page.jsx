"use client";
import StoryForm from "./_components/storyForm";

// Add Your Story Page
const AddYourStoryPage = () => (
  <div className="lg:pl-10 2xl:pl-20 pl-5 pr-5 lg:pr-10 xl:pr-0">
    <div className="xl:flex lg:gap-20">
      <div className="basis-[60%] py-20">
        <StoryForm />
      </div>
      <div className="basis-[40%] relative hidden xl:block">
        <img
          src="/hannah-olinger-8eSrC43qdro-unsplash.jpg"
          alt="..."
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            position: "absolute",
            inset: 0,
          }}
        />
      </div>
    </div>
  </div>
);

export default AddYourStoryPage;
