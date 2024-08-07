import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { FaFilter } from "react-icons/fa";
import axios from "axios";
import { useLoaderData } from "react-router-dom";

const Filter = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };
  return (
    <>
      <div>
        <button
          id="dropdownDefaultButton"
          onClick={toggleDropdown}
          className="text-black 0 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center "
          type="button"
        >
          <FaFilter />
          <svg
            className="w-2.5 h-2.5 ms-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>

        {/* Dropdown menu */}
        {dropdownVisible && (
          <div
            id="dropdown"
            className="z-10 absolute mt-4 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
          >
            <ul
              className="py-2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownDefaultButton"
            >
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Settings
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Earnings
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Sign out
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default function ThriftProducts() {
  const [products, setProducts] = useState([]);
  const fetchedProducts = useLoaderData();
  console.log(fetchedProducts);

  // const fetchProducts = async () => {
  //   try {
  //     const response = await axios.get(
  //       "http://localhost:4000/api/thrift-products/"
  //     );
  //     console.log(response.data.thriftProducts);
  //     setProducts(response.data.thriftProducts);
  //     // console.log("products:", products[2].images[0]);
  //   } catch (error) {
  //     console.error("Error fetching products:", error);
  //   }
  // };

  useEffect(() => {
    if (fetchedProducts?.thriftProducts) {
      setProducts(fetchedProducts.thriftProducts);
    }
    // fetchProducts();
  }, [fetchedProducts]);

  // const products = [
  //   {
  //     _id: {
  //       $oid: "669bc354cba639208317327a",
  //     },
  //     title: "ADRO Men's Cotton Neck Hooded Sweatshirt (H21-M-BYO-OL_Olive_S)",
  //     description:
  //       "This olive hoodie is crafted from 100% pure cotton, offering an eco-friendly and durable design. It features a regular fit with full sleeves, providing a trendy yet casual look. Perfect for gym wear, winter outings, or chilly evenings, its quality stitching ensures longevity. For best care, wash with similar colors, either machine or hand wash in cold water, and dry in the shade. Remember to check the size chart for the perfect fit.",
  //     category: "Clothing",
  //     images: [
  //       "uploads/freshProducts/ADRO Men's Cotton Neck Hooded Sweatshirt (H21-M-BYO-OL_Olive_S)/clothing1 - overview.jpg",
  //       "uploads/freshProducts/ADRO Men's Cotton Neck Hooded Sweatshirt (H21-M-BYO-OL_Olive_S)/clothing1 - slide1.jpg",
  //       "uploads/freshProducts/ADRO Men's Cotton Neck Hooded Sweatshirt (H21-M-BYO-OL_Olive_S)/clothing1 - slide2.jpg",
  //     ],
  //     price: 899,
  //     reviews: [],
  //     __v: 0,
  //   },
  // ];
  return (
    <>
      <section className="bg-gray-50 py-4 antialiased md:py-6">
        <div className="flex mb-4 max-w-full space-y-3">
          <div className="w-[90%] flex items-center relative left-[1%] lg:left-[7%] gap-5">
            <Filter />
            <div className="relative w-full sm:w-[60%] md:w-[70%] lg:w-[50%]">
              <input
                type="email"
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
            {products.map((product, index) => (
              <ProductCard
                key={index}
                product={product}
                productType="Thrift Product"
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
