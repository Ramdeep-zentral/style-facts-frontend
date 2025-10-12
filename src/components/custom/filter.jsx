'use client';
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import GlobalApi from "@/service/GlobalApi";
import Link from "next/link";

const Filter = () => {

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

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
    <div className="container lg:py-20 py-10">
      <div className="lg:flex">
      <div className=" basis-8/12">
        <h4>Categories</h4>
        <ul className="flex flex-wrap gap-3 mt-5 list-none p-0 m-0">
          {categories.map((category) => (
            <li key={category.id} className="m-0 p-0">
              <Link href={`/search/${category.name}`}>
                <Button
                  className={`${selectedCategory === category ? 'bg-black text-white' : ''}`}
                  variant="filter"
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category.name}
                </Button>
              </Link>
            </li>
          ))}
        </ul>
        </div>
      </div>
      <div className=" basis-4/12"></div>
      </div>
   
  );
};

export default Filter;
