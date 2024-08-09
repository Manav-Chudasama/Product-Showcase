import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { FaFilter } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { GiClothes, GiSlippers } from "react-icons/gi";
import { FcElectroDevices } from "react-icons/fc";
import { FaBookBookmark } from "react-icons/fa6";

const Filter = ({ selectedCategory, setSelectedCategory }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setDropdownVisible(false); // Close the dropdown after selection
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <>
      <div ref={dropdownRef}>
        <button
          id="dropdownDefaultButton"
          onClick={toggleDropdown}
          className="text-black 0 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center space-x-2"
          type="button"
        >
          {selectedCategory == "All Category" ? (
            <FaFilter />
          ) : selectedCategory == "Clothing" ? (
            <GiClothes color="red" />
          ) : selectedCategory == "Electronics" ? (
            <FcElectroDevices color="blue" />
          ) : selectedCategory == "Footwear" ? (
            <GiSlippers color="green" />
          ) : (
            <FaBookBookmark color="purple" />
          )}

          <IoIosArrowDown />
        </button>

        {/* Dropdown menu */}
        {dropdownVisible && (
          <div
            id="dropdown"
            className="z-10 absolute mt-4 bg-white divide-y divide-gray-100 rounded-lg shadow w-44"
          >
            <ul
              className="py-2 text-sm text-gray-700"
              aria-labelledby="dropdownDefaultButton"
            >
              <li>
                <button
                  onClick={() => handleCategoryClick("All Category")}
                  className={`flex gap-2 items-center w-full px-4 py-2 hover:bg-gray-100 ${
                    selectedCategory === "All Category"
                      ? "bg-gray-100 text-blue-600"
                      : ""
                  }`}
                >
                  <FaFilter />
                  All Category
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick("Clothing")}
                  className={`flex gap-2 items-center w-full px-4 py-2 hover:bg-gray-100 ${
                    selectedCategory === "Clothing"
                      ? "bg-gray-100 text-blue-600"
                      : ""
                  }`}
                >
                  <GiClothes color="red" />
                  Clothing
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick("Electronics")}
                  className={`flex gap-2 items-center w-full px-4 py-2 hover:bg-gray-100 ${
                    selectedCategory === "Electronics"
                      ? "bg-gray-100 text-blue-600"
                      : ""
                  }`}
                >
                  <FcElectroDevices color="blue" />
                  Electronics
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick("Footwear")}
                  className={`flex gap-2 items-center w-full px-4 py-2 hover:bg-gray-100 ${
                    selectedCategory === "Footwear"
                      ? "bg-gray-100 text-blue-600"
                      : ""
                  }`}
                >
                  <GiSlippers color="green" />
                  Footwear
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick("Books")}
                  className={`flex gap-2 items-center w-full px-4 py-2 hover:bg-gray-100 ${
                    selectedCategory === "Books"
                      ? "bg-gray-100 text-blue-600"
                      : ""
                  }`}
                >
                  <FaBookBookmark color="purple" />
                  Books
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

Filter.propTypes = {
  selectedCategory: PropTypes.object.isRequired,
  setSelectedCategory: PropTypes.func.isRequired,
};

export default Filter;
