import React from "react";
import CategorySideBar from "./_components/categorySideBar";

const layout = ({ children }) => {
  return (
    <div className="container lg:py-28 py-10">
      <div className="flex lg:flex-row flex-col gap-10">
        <div className=" basis-1/4">
            <CategorySideBar />
        </div>
        <div className="basis-3/4">{children}</div>
      </div>
     
    </div>
  );
};

export default layout;
