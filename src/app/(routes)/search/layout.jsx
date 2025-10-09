import React from "react";
import CategorySideBar from "./_components/categorySideBar";

const layout = ({ children }) => {
  return (
    <div className="container lg:py-28 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-4 lg:gap-4 gap-10">
        <div className="div">
            <CategorySideBar />
        </div>
        <div className="col-span-3">{children}</div>
      </div>
     
    </div>
  );
};

export default layout;
