import React, { useEffect } from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import ProductCard from "./ProductCard";
import Filter from "../../utils/parts/Filter";
import { FaFilter } from "react-icons/fa";
import axios from "axios";
import { useLoaderData } from "react-router-dom";
import { Fade } from "react-awesome-reveal";

export default function FreshProducts() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All Category");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchedProducts = useLoaderData();
  // Fisher-Yates shuffle algorithm
  const shuffleArray = (array) => {
    let shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (fetchedProducts?.freshProducts) {
      const shuffledProducts = shuffleArray(fetchedProducts.freshProducts);
      setProducts(shuffledProducts);
    }
  }, [fetchedProducts]);

  // Filter products based on the selected category and search term
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "All Category" ||
      product.category === selectedCategory;
    const matchesSearch =
      searchTerm === "" ||
      product.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <Fade>
      <div className="bg-gray-50 py-4 antialiased md:py-6">
        <div className="flex mb-4 max-w-full space-y-3">
          <div className="w-[90%] flex items-center relative left-[1%] lg:left-[7%] gap-5">
            <Filter
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
            <div className="relative w-full sm:w-[60%] md:w-[70%] lg:w-[50%]">
              <input
                onChange={(e) => setSearchTerm(e.target.value)}
                type="text"
                className="peer py-3 pe-0 ps-8 block w-full bg-transparent border-t-transparent border-b-2 border-x-transparent border-b-gray-200 text-sm focus:border-t-transparent focus:border-x-transparent focus:border-b-blue-500 focus:ring-0 disabled:opacity-50 disabled:pointer-events-none"
                placeholder="Search for products"
              />
              <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-2 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
                <svg
                  className="w-4 h-4 me-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <div className="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product, index) => (
              <ProductCard
                key={index}
                product={product}
                productType={"Fresh Product"}
              />
            ))}
          </div>
        </div>
      </div>
    </Fade>
  );
}
