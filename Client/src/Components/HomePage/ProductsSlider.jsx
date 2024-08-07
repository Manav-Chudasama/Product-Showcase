import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/swiper-bundle.css";
import "swiper/css";
import "swiper/css/pagination";
import electronics from "../../assets/featuredProducts/electronics.png";
const Products = () => {
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={10}
      breakpoints={{
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 40,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 10,
        },
      }}
      className="mySwiper"
    >
      <SwiperSlide className="">
        {/* product - start */}
        <div className="h-fit flex flex-col items-center">
          <a
            href="#"
            className="group relative mb-2 block h-60 w-56 overflow-hidden rounded-lg lg:mb-3"
          >
            <img
              src={electronics}
              loading="lazy"
              alt="Photo by Rachit Tank"
              className="h-full w-full object-contain object-center transition duration-200 group-hover:scale-110"
            />
            <span className="absolute left-0 top-0 rounded-br-lg bg-red-500 px-3 py-1.5 text-sm uppercase tracking-wider text-white">
              sale
            </span>
          </a>
          <div>
            <a
              href="#"
              className="block text-center hover:gray-800 mb-1 text-gray-500 transition duration-100 lg:text-lg"
            >
              Timely Watch
            </a>
            <div className="flex items-end justify-center gap-2">
              <span className="font-bold text-gray-800 lg:text-lg">$15.00</span>
              <span className="mb-0.5 text-red-500 line-through">$30.00</span>
            </div>
          </div>
        </div>
        {/* product - end */}
      </SwiperSlide>
      <SwiperSlide className="">
        {/* product - start */}
        <div className="h-fit flex flex-col items-center">
          <a
            href="#"
            className="group relative mb-2 block h-60 w-56 overflow-hidden rounded-lg lg:mb-3"
          >
            <img
              src={electronics}
              loading="lazy"
              alt="Photo by Rachit Tank"
              className="h-full w-full object-contain object-center transition duration-200 group-hover:scale-110"
            />
            <span className="absolute left-0 top-0 rounded-br-lg bg-red-500 px-3 py-1.5 text-sm uppercase tracking-wider text-white">
              sale
            </span>
          </a>
          <div>
            <a
              href="#"
              className="block text-center hover:gray-800 mb-1 text-gray-500 transition duration-100 lg:text-lg"
            >
              Timely Watch
            </a>
            <div className="flex items-end justify-center gap-2">
              <span className="font-bold text-gray-800 lg:text-lg">$15.00</span>
              <span className="mb-0.5 text-red-500 line-through">$30.00</span>
            </div>
          </div>
        </div>
        {/* product - end */}
      </SwiperSlide>
      <SwiperSlide className="">
        {/* product - start */}
        <div className="h-fit flex flex-col items-center">
          <a
            href="#"
            className="group relative mb-2 block h-60 w-56 overflow-hidden rounded-lg lg:mb-3"
          >
            <img
              src={electronics}
              loading="lazy"
              alt="Photo by Rachit Tank"
              className="h-full w-full object-contain object-center transition duration-200 group-hover:scale-110"
            />
            <span className="absolute left-0 top-0 rounded-br-lg bg-red-500 px-3 py-1.5 text-sm uppercase tracking-wider text-white">
              sale
            </span>
          </a>
          <div>
            <a
              href="#"
              className="block text-center hover:gray-800 mb-1 text-gray-500 transition duration-100 lg:text-lg"
            >
              Timely Watch
            </a>
            <div className="flex items-end justify-center gap-2">
              <span className="font-bold text-gray-800 lg:text-lg">$15.00</span>
              <span className="mb-0.5 text-red-500 line-through">$30.00</span>
            </div>
          </div>
        </div>
        {/* product - end */}
      </SwiperSlide>
      <SwiperSlide className="">
        {/* product - start */}
        <div className="h-fit flex flex-col items-center">
          <a
            href="#"
            className="group relative mb-2 block h-60 w-56 overflow-hidden rounded-lg lg:mb-3"
          >
            <img
              src={electronics}
              loading="lazy"
              alt="Photo by Rachit Tank"
              className="h-full w-full object-contain object-center transition duration-200 group-hover:scale-110"
            />
            <span className="absolute left-0 top-0 rounded-br-lg bg-red-500 px-3 py-1.5 text-sm uppercase tracking-wider text-white">
              sale
            </span>
          </a>
          <div>
            <a
              href="#"
              className="block text-center hover:gray-800 mb-1 text-gray-500 transition duration-100 lg:text-lg"
            >
              Timely Watch
            </a>
            <div className="flex items-end justify-center gap-2">
              <span className="font-bold text-gray-800 lg:text-lg">$15.00</span>
              <span className="mb-0.5 text-red-500 line-through">$30.00</span>
            </div>
          </div>
        </div>
        {/* product - end */}
      </SwiperSlide>
      <SwiperSlide className="">
        {/* product - start */}
        <div className="h-fit flex flex-col items-center">
          <a
            href="#"
            className="group relative mb-2 block h-60 w-56 overflow-hidden rounded-lg lg:mb-3"
          >
            <img
              src={electronics}
              loading="lazy"
              alt="Photo by Rachit Tank"
              className="h-full w-full object-contain object-center transition duration-200 group-hover:scale-110"
            />
            <span className="absolute left-0 top-0 rounded-br-lg bg-red-500 px-3 py-1.5 text-sm uppercase tracking-wider text-white">
              sale
            </span>
          </a>
          <div>
            <a
              href="#"
              className="block text-center hover:gray-800 mb-1 text-gray-500 transition duration-100 lg:text-lg"
            >
              Timely Watch
            </a>
            <div className="flex items-end justify-center gap-2">
              <span className="font-bold text-gray-800 lg:text-lg">$15.00</span>
              <span className="mb-0.5 text-red-500 line-through">$30.00</span>
            </div>
          </div>
        </div>
        {/* product - end */}
      </SwiperSlide>
      <SwiperSlide className="">
        {/* product - start */}
        <div className="h-fit flex flex-col items-center">
          <a
            href="#"
            className="group relative mb-2 block h-60 w-56 overflow-hidden rounded-lg lg:mb-3"
          >
            <img
              src={electronics}
              loading="lazy"
              alt="Photo by Rachit Tank"
              className="h-full w-full object-contain object-center transition duration-200 group-hover:scale-110"
            />
            <span className="absolute left-0 top-0 rounded-br-lg bg-red-500 px-3 py-1.5 text-sm uppercase tracking-wider text-white">
              sale
            </span>
          </a>
          <div>
            <a
              href="#"
              className="block text-center hover:gray-800 mb-1 text-gray-500 transition duration-100 lg:text-lg"
            >
              Timely Watch
            </a>
            <div className="flex items-end justify-center gap-2">
              <span className="font-bold text-gray-800 lg:text-lg">$15.00</span>
              <span className="mb-0.5 text-red-500 line-through">$30.00</span>
            </div>
          </div>
        </div>
        {/* product - end */}
      </SwiperSlide>
      <SwiperSlide className="">
        {/* product - start */}
        <div className="h-fit flex flex-col items-center">
          <a
            href="#"
            className="group relative mb-2 block h-60 w-56 overflow-hidden rounded-lg lg:mb-3"
          >
            <img
              src={electronics}
              loading="lazy"
              alt="Photo by Rachit Tank"
              className="h-full w-full object-contain object-center transition duration-200 group-hover:scale-110"
            />
            <span className="absolute left-0 top-0 rounded-br-lg bg-red-500 px-3 py-1.5 text-sm uppercase tracking-wider text-white">
              sale
            </span>
          </a>
          <div>
            <a
              href="#"
              className="block text-center hover:gray-800 mb-1 text-gray-500 transition duration-100 lg:text-lg"
            >
              Timely Watch
            </a>
            <div className="flex items-end justify-center gap-2">
              <span className="font-bold text-gray-800 lg:text-lg">$15.00</span>
              <span className="mb-0.5 text-red-500 line-through">$30.00</span>
            </div>
          </div>
        </div>
        {/* product - end */}
      </SwiperSlide>
      <SwiperSlide className="">
        {/* product - start */}
        <div className="h-fit flex flex-col items-center">
          <a
            href="#"
            className="group relative mb-2 block h-60 w-56 overflow-hidden rounded-lg lg:mb-3"
          >
            <img
              src={electronics}
              loading="lazy"
              alt="Photo by Rachit Tank"
              className="h-full w-full object-contain object-center transition duration-200 group-hover:scale-110"
            />
            <span className="absolute left-0 top-0 rounded-br-lg bg-red-500 px-3 py-1.5 text-sm uppercase tracking-wider text-white">
              sale
            </span>
          </a>
          <div>
            <a
              href="#"
              className="block text-center hover:gray-800 mb-1 text-gray-500 transition duration-100 lg:text-lg"
            >
              Timely Watch
            </a>
            <div className="flex items-end justify-center gap-2">
              <span className="font-bold text-gray-800 lg:text-lg">$15.00</span>
              <span className="mb-0.5 text-red-500 line-through">$30.00</span>
            </div>
          </div>
        </div>
        {/* product - end */}
      </SwiperSlide>
    </Swiper>
  );
};

export default function ProductsSlider() {
  return (
    <div className="flex flex-col sm:flex-row">
      <div className="w-full sm:w-[30%]">Noice</div>
      <div className="w-full sm:w-[70%]">
        <Products />
      </div>
    </div>
  );
}
