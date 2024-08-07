import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { IoClose } from "react-icons/io5";
import Logo from "../../assets/Logo1.png";
import { FaShoppingCart } from "react-icons/fa";
import { BsFillBagHeartFill } from "react-icons/bs";
export default function Sidebar({ isOpen, toggleSidebar }) {
  return (
    <div>
      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <div className="flex justify-end">
            <button onClick={toggleSidebar}>
              <IoClose size={30} />
            </button>
          </div>
          <div className="w-full flex flex-col items-center space-y-2 py-2">
            <img src={Logo} className="h-12 rounded-full" alt="" />
            <span className="md:text-xl font-semibold"> Manav Chudasama</span>
          </div>
          <ul className="space-y-2 font-medium mt-5">
            <li>
              <NavLink
                to="/"
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100"
                style={({ isActive }) => ({
                  backgroundColor: isActive
                    ? "rgb(243 244 246 / var(--tw-bg-opacity))"
                    : "",
                })}
              >
                <span className="ms-3">Home</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/fresh-products"
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100"
                style={({ isActive }) => ({
                  backgroundColor: isActive
                    ? "rgb(243 244 246 / var(--tw-bg-opacity))"
                    : "",
                })}
              >
                <span className="flex-1 ms-3 whitespace-nowrap">Products</span>
                <span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">
                  Pro
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/thrift-products"
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100"
                style={({ isActive }) => ({
                  backgroundColor: isActive
                    ? "rgb(243 244 246 / var(--tw-bg-opacity))"
                    : "",
                })}
              >
                <span className="flex-1 ms-3 whitespace-nowrap">Thrift</span>
                <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                  3
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about-us"
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100"
                style={({ isActive }) => ({
                  backgroundColor: isActive
                    ? "rgb(243 244 246 / var(--tw-bg-opacity))"
                    : "",
                })}
              >
                <span className="flex-1 ms-3 whitespace-nowrap">About Us</span>
              </NavLink>
            </li>
            {/* <li>
              <Link
                to="/shopping-cart"
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <span className="flex-1 ms-3 whitespace-nowrap">
                  <FaShoppingCart className="cursor-pointer" size={30} />
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/wishlist"
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <span className="flex-1 ms-3 whitespace-nowrap">
                  <BsFillBagHeartFill className="cursor-pointer" size={30} />
                </span>
              </Link>
            </li> */}
          </ul>
        </div>
      </aside>
    </div>
  );
}

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
};
