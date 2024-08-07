import React, { useState } from "react";
import { FaFilter } from "react-icons/fa";

export function Filter() {
  const [isFilterOpen, setFilterOpen] = useState(false);

  const handleFilter = () => {
    setFilterOpen(!isFilterOpen);
  };

  return (
    <div>
      <button
        type="button"
        className="absolute inset-y-0 left-0 flex items-center my-2 ml-1 border border-gray-300 rounded-lg px-4 text-gray-600 dark:text-gray-400 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300"
        onClick={handleFilter}
      >
        <FaFilter />
      </button>
      <div
        className={` ${
          isFilterOpen ? "block" : "hidden"
        } absolute top-[55px] md:top-16 w-48 text-gray-900 bg-white border border-gray-200 rounded-lg z-50`}
      >
        <button
          type="button"
          className="relative inline-flex items-center w-full px-4 py-2 text-sm font-medium border-b border-gray-200 rounded-t-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
        >
          All Category
        </button>
        <button
          type="button"
          className="relative inline-flex items-center w-full px-4 py-2 text-sm font-medium border-b border-gray-200 rounded-t-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
        >
          Clothing
        </button>
        <button
          type="button"
          className="relative inline-flex items-center w-full px-4 py-2 text-sm font-medium border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
        >
          Electronics
        </button>
        <button
          type="button"
          className="relative inline-flex items-center w-full px-4 py-2 text-sm font-medium border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
        >
          Footwear
        </button>
        <button
          type="button"
          className="relative inline-flex items-center w-full px-4 py-2 text-sm font-medium rounded-b-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
        >
          Books
        </button>
      </div>
    </div>
  );
}

export default function Search() {
  return (
    <div>
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Search
      </label>
      <div className="relative">
        <Filter />
        <input
          type="search"
          id="default-search"
          className="block w-full p-4 ps-16 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
          placeholder="Search"
          required=""
        />
        <button
          type="submit"
          className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
        >
          Search
        </button>
      </div>
    </div>
  );
}
