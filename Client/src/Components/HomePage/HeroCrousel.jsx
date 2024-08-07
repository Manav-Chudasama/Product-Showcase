import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import { Carousel } from "flowbite-react";
import homeProduct1 from "../../assets/homeProduct1.png";
import homeProduct2 from "../../assets/homeProduct2.png";
import { Link } from "react-router-dom";

export default function HeroCarousel() {
  return (
    <div
      // style={{ backgroundImage: `url(${Hmebg})` }}
      className="h-[60vh] md:h-[75vh] flex px-4 md:px-20 md:items-center md:bg-cover bg-white"
    >
      <Swiper
        className="md:h-[75%] sm:h-[70%] h-full w-full overflow-hidden rounded-lg shadow-[0_4px_8px_0_rgba(0,0,0,0.2)] transition-all hover:shadow-[0_8px_14px_0_rgba(0,0,0,0.2)] relative"
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        // navigation
        pagination={{ clickable: true }}
        // scrollbar={{ draggable: true }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        loop={true}
        // onSwiper={(swiper) => console.log(swiper)}
        // onSlideChange={() => console.log("slide change")}
      >
        <SwiperSlide>
          <div className="flex flex-col-reverse justify-center md:flex-row md:justify-around items-center h-full w-full duration-700 ease-in-out">
            <div className="flex flex-col justify-center text-justify items-center md:items-start md:w-[40%] h-full space-y-4">
              <h1 className="text-xl lg:text-5xl md:text-2xl font-bold">
                Innovative Solutions
              </h1>
              <p className="text-sm px-4 md:px-0 md:text-xl lg:text-3xl">
                Discover cutting-edge{" "}
                <span className="text-blue-600 font-bold hover:underline cursor-pointer transition-all duration-300">
                  technologies designed
                </span>{" "}
                to make your life easier and more efficient.
              </p>
              <div>
                <Link to="/fresh-products">
                  <button
                    type="button"
                    className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300  shadow-lg shadow-blue-500/50  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 "
                  >
                    Explore Now
                  </button>
                </Link>
              </div>
            </div>
            <div className="md:w-[40%] flex justify-center">
              <img className="w-[80%] md:w-full" src={homeProduct1} alt="" />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex flex-col-reverse justify-center md:flex-row md:justify-around items-center h-full w-full duration-700 ease-in-out">
            <div className="flex flex-col justify-center items-center md:items-start md:w-[40%] h-full space-y-4">
              <h1 className="text-xl lg:text-5xl md:text-2xl font-bold">
                Unmatched Quality
              </h1>
              <p className="text-sm px-4 md:px-0 md:text-xl lg:text-3xl text-justify">
                Our commitment to ensures you receive the{" "}
                <span className="text-blue-600 font-bold hover:underline cursor-pointer transition-all duration-300">
                  best products
                </span>{" "}
                in the Market.
              </p>
              <div>
                <button
                  type="button"
                  className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300  shadow-lg shadow-blue-500/50  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 "
                >
                  Explore Now
                </button>
              </div>
            </div>
            <div className="md:w-[40%] flex justify-center">
              <img className="w-[80%] md:w-full" src={homeProduct2} alt="" />
            </div>
          </div>
        </SwiperSlide>
        {/* <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide> */}
      </Swiper>

      {/* <Carousel
        leftControl={" "}
        rightControl={" "}
        className="md:h-[75%] sm:h-[70%] h-full w-full border border-black overflow-hidden rounded-lg relative"
      >
        <div className="flex flex-col-reverse justify-center md:flex-row md:justify-around items-center h-full w-full duration-700 ease-in-out">
          <div className="flex flex-col justify-center text-justify items-center md:items-start md:w-[40%] h-full space-y-4">
            <h1 className="text-xl lg:text-5xl md:text-2xl font-bold">
              Innovative Solutions
            </h1>
            <p className="text-sm px-4 md:px-0 md:text-xl lg:text-3xl">
              Discover cutting-edge{" "}
              <span className="text-blue-600 font-bold hover:underline cursor-pointer transition-all duration-300">
                technologies designed
              </span>{" "}
              to make your life easier and more efficient.
            </p>
            <div>
              <button
                type="button"
                className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300  shadow-lg shadow-blue-500/50  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 "
              >
                Explore Now
              </button>
            </div>
          </div>
          <div className="md:w-[40%] flex justify-center">
            <img className="w-[80%] md:w-full" src={homeProduct1} alt="" />
          </div>
        </div>
        <div className="flex flex-col-reverse justify-center md:flex-row md:justify-around items-center h-full w-full duration-700 ease-in-out">
          <div className="flex flex-col justify-center items-center md:items-start md:w-[40%] h-full space-y-4">
            <h1 className="text-xl lg:text-5xl md:text-2xl font-bold">
              Unmatched Quality
            </h1>
            <p className="text-sm px-4 md:px-0 md:text-xl lg:text-3xl text-justify">
              Our commitment to ensures you receive the{" "}
              <span className="text-blue-600 font-bold hover:underline cursor-pointer transition-all duration-300">
                best products
              </span>{" "}
              in the Market.
            </p>
            <div>
              <button
                type="button"
                className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300  shadow-lg shadow-blue-500/50  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 "
              >
                Explore Now
              </button>
            </div>
          </div>
          <div className="md:w-[40%] flex justify-center">
            <img className="w-[80%] md:w-full" src={homeProduct2} alt="" />
          </div>
        </div>
      </Carousel> */}
    </div>
  );
}
