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
      console.log(resp.data);
      setCategories(resp.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
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
        <div className="flex flex-wrap gap-3 mt-5">
          {categories.map((category) => (
            <Link key={category.id} href={`/search/${category.name}`}>
            <Button className={`${selectedCategory === category ? 'bg-black text-white' : ''}`} key={category.id} variant="filter" size="sm"
              onClick={() => setSelectedCategory(category)}
            >
              {category.name}
            </Button>
            </Link>
          ))}
        </div>
        </div>
      </div>
      <div className=" basis-4/12"></div>
      </div>
   
  );
};

export default Filter;
