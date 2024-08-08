import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaShoppingCart, FaFilter } from "react-icons/fa";
import { BsFillBagHeartFill } from "react-icons/bs";
import { RiAccountCircleFill, RiGalleryUploadFill } from "react-icons/ri";
import { BiLogOut } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";
import Logo from "../../assets/Logo.png";
import Logo1 from "../../assets/Logo1.png";
import Sidebar from "./Sidebar";
import {
  ClerkLoaded,
  SignedIn,
  SignedOut,
  SignOutButton,
  useUser,
} from "@clerk/clerk-react";
import { Fade, Slide } from "react-awesome-reveal";
export default function Header() {
  const { user } = useUser();
  // console.log(user.firstname);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const toggleSidebar = () => {
    console.log(isSidebarOpen);
    setSidebarOpen(!isSidebarOpen);
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <>
      <ClerkLoaded>
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="w-full flex flex-col p-4 justify-between">
          <div className="w-full pb-4 flex justify-between items-center border-b border-black">
            <button onClick={toggleSidebar}>
              <GiHamburgerMenu size={30} className="md:hidden" />
            </button>
            <div className="flex items-center space-x-2 md:w-[20%]">
              <img src={Logo} className="h-12 rounded-full" alt="" />
              {/* <span className="md:text-2xl font-semibold"> Product-Showcase</span> */}
            </div>
            <div className="hidden md:flex justify-center items-center md:w-[60%] px-2">
              <div className="w-[90%]">
                <div className="w-full flex items-center">
                  <ul className="w-full text-lg flex justify-around space-x-10 lg:space-x-20 font-bold">
                    <li className="cursor-pointer">
                      <NavLink
                        to="/"
                        style={({ isActive }) => ({
                          color: isActive ? "blue" : "Black",
                        })}
                      >
                        Home
                      </NavLink>
                    </li>
                    <li className="cursor-pointer">
                      <NavLink
                        to="/fresh-products"
                        style={({ isActive }) => ({
                          color: isActive ? "blue" : "Black",
                        })}
                      >
                        Products
                      </NavLink>
                    </li>
                    <li className="cursor-pointer">
                      <NavLink
                        to="/thrift-products"
                        style={({ isActive }) => ({
                          color: isActive ? "blue" : "Black",
                        })}
                      >
                        Thrift
                      </NavLink>
                    </li>
                    <li className="cursor-pointer">
                      <NavLink
                        to="/about-us"
                        style={({ isActive }) => ({
                          color: isActive ? "blue" : "Black",
                        })}
                      >
                        About Us
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="w-[20%] flex justify-center items-center">
              <div
                className="flex items-center space-x-2 cursor-pointer"
                onClick={toggleDropdown}
              >
                <img
                  src={user?.imageUrl ?? Logo1}
                  className="h-12 rounded-full"
                  alt=""
                />
                <span className="hidden md:block font-bold">
                  {user?.firstName ?? ""}
                </span>
              </div>
              {dropdownVisible && (
                <div
                  id="dropdown"
                  className="z-50 absolute top-20 right-5 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                >
                  <SignedIn>
                    <ul
                      className="py-2 text-sm text-gray-700"
                      aria-labelledby="dropdownDefaultButton"
                    >
                      <li>
                        <NavLink
                          to="account-profile"
                          className="flex gap-2 items-center px-4 py-2 hover:bg-gray-100"
                          style={({ isActive }) => ({
                            backgroundColor: isActive
                              ? "rgb(243 244 246 / var(--tw-bg-opacity))"
                              : "",
                          })}
                        >
                          <RiAccountCircleFill />
                          Account
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/wishlist"
                          className="flex gap-2 items-center px-4 py-2 hover:bg-gray-100"
                          style={({ isActive }) => ({
                            backgroundColor: isActive
                              ? "rgb(243 244 246 / var(--tw-bg-opacity))"
                              : "",
                          })}
                        >
                          <BsFillBagHeartFill />
                          Wishlist
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/shopping-cart"
                          className="flex gap-2 items-center px-4 py-2 hover:bg-gray-100"
                          style={({ isActive }) => ({
                            backgroundColor: isActive
                              ? "rgb(243 244 246 / var(--tw-bg-opacity))"
                              : "",
                          })}
                        >
                          <FaShoppingCart />
                          Your Cart
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/add-product"
                          className="flex gap-2 items-center px-4 py-2 hover:bg-gray-100"
                          style={({ isActive }) => ({
                            backgroundColor: isActive
                              ? "rgb(243 244 246 / var(--tw-bg-opacity))"
                              : "",
                          })}
                        >
                          <RiGalleryUploadFill />
                          Upload Product
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/user-thrift-products"
                          className="flex gap-2 items-center px-4 py-2 hover:bg-gray-100"
                          style={({ isActive }) => ({
                            backgroundColor: isActive
                              ? "rgb(243 244 246 / var(--tw-bg-opacity))"
                              : "",
                          })}
                        >
                          <RiGalleryUploadFill />
                          Your Uploads
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          // to="/sign-in"
                          className="flex gap-2 items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          <BiLogOut />
                          <SignOutButton redirectUrl="/sign-in" />
                        </NavLink>
                      </li>
                    </ul>
                  </SignedIn>
                  <SignedOut>
                    <ul
                      className="py-2 text-sm text-gray-700"
                      aria-labelledby="dropdownDefaultButton"
                    >
                      <li>
                        <NavLink
                          to="/sign-in"
                          className="flex gap-2 items-center px-4 py-2 hover:bg-gray-100"
                          style={({ isActive }) => ({
                            backgroundColor: isActive
                              ? "rgb(243 244 246 / var(--tw-bg-opacity))"
                              : "",
                          })}
                        >
                          <RiAccountCircleFill />
                          Sign in
                        </NavLink>
                      </li>
                    </ul>
                  </SignedOut>
                </div>
              )}
            </div>
          </div>

          {/* <div className="hidden md:flex w-full p-4">
          <div className="w-[75%] flex items-center">
            <ul className="w-full text-lg flex justify-around space-x-20 font-bold">
              <li className="cursor-pointer">
                <Link to="/">Home</Link>
              </li>
              <li className="cursor-pointer">
                <Link to="/fresh-products">Products</Link>
              </li>
              <li className="cursor-pointer">
                <Link to="/thrift-products">Thrift</Link>
              </li>
              <li className="cursor-pointer">
                <Link to="/about-us">About Us</Link>
              </li>
            </ul>
          </div>
          <div className="w-[25%] flex justify-around">
            <Link to="/shopping-cart">
              <FaShoppingCart className="cursor-pointer" size={30} />
            </Link>
            <Link to="/wishlist">
              <BsFillBagHeartFill className="cursor-pointer" size={30} />
            </Link>
          </div>
        </div> */}
          {/* <div className="md:hidden pt-2"><Search /></div> */}
          <hr className="hidden md:block" />
        </div>
      </ClerkLoaded>
    </>
  );
}
