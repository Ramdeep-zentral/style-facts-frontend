"use client";
import GlobalApi from "@/service/GlobalApi";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const CategorySideBar = () => {
  const pathname = usePathname();
    const selectedCategory = decodeURIComponent(pathname.split("/").pop());
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const resp = await GlobalApi.GetCategories();
      setCategories(resp.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategories([]);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <div>
      <h1>Categories</h1>
      <ul className="flex xl:flex-col flex-row flex-wrap gap-2 mt-5">
        {categories.map((category) => (
          <Link key={category.id} href={`/search/${category.name}`}>
            <li
              key={category.id}

              className={`py-2 border px-4 cursor-pointer ${
                selectedCategory === category.name ? "bg-black text-white" : ""
              }`}
            >
              {category.name}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default CategorySideBar;
