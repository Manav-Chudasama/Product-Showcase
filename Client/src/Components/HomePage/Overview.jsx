import React from "react";
import { ReactTyped } from "react-typed";
import clothing from "../../assets/overview icons/clothing.png";
import electronics from "../../assets/overview icons/electronics.png";
import footwear from "../../assets/overview icons/footwear.png";
import books from "../../assets/overview icons/books.png";
import { AttentionSeeker, Bounce, Fade, Slide } from "react-awesome-reveal";
export default function Overview() {
  return (
    <div className="mt-24 py-10 px-2 flex flex-col w-full gap-28 bg-gray-100">
      <div className="flex w-[90%] md:w-[80%] mx-auto">
        <h1 className="text-2xl md:text-4xl text-justify">
          <Fade className="inline">
            <Slide direction="down">
              Discover unbeatable offers on the finest handcrafted items and
              unique treasures, crafted to meet your
            </Slide>
          </Fade>
          {/* <span className="text-blue-600 font-bold hover:underline cursor-pointer transition-all duration-300">
            {" "}
            <ReactTyped
              strings={[
                "lifestyle needs.",
                "quality items.",
                "budget buys.",
                "top-rated items.",
              ]}
              typeSpeed={100}
              backSpeed={100}
              backDelay={5000}
              loop
            />
          </span>{" "} */}
        </h1>
      </div>
      <Fade cascade="true">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 w-full">
          <Slide direction="left" className="h-full" triggerOnce>
            <div className="h-full flex flex-col items-center pb-5 rounded-xl shadow-[0_4px_8px_0_rgba(0,0,0,0.2)] transition-all hover:shadow-[0_8px_14px_0_rgba(0,0,0,0.2)]">
              <img
                className="h-14 sm:h-20 md:h-24 my-4"
                src={clothing}
                alt=""
              />
              <h1 className="font-bold text-2xl ">Clolthing</h1>
              <p className="text-center text-sm md:text-xl">
                Stylish and trendy
              </p>
            </div>
          </Slide>
          <Slide direction="down" delay={400} className="h-full" triggerOnce>
            <div className="h-full flex flex-col items-center pb-5 rounded-xl shadow-[0_4px_8px_0_rgba(0,0,0,0.2)] transition-all hover:shadow-[0_8px_14px_0_rgba(0,0,0,0.2)]">
              <img
                className="h-14 sm:h-20 md:h-24 my-4"
                src={electronics}
                alt=""
              />
              <h1 className="font-bold text-2xl ">Electronics</h1>
              <p className="text-center text-sm md:text-xl">
                The latest gadgets and devices
              </p>
            </div>
          </Slide>
          <Slide direction="up" delay={800} className="h-full" triggerOnce>
            <div className="h-full flex flex-col items-center pb-5 rounded-xl shadow-[0_4px_8px_0_rgba(0,0,0,0.2)] transition-all hover:shadow-[0_8px_14px_0_rgba(0,0,0,0.2)]">
              <img
                className="h-14 sm:h-20 md:h-24 my-4"
                src={footwear}
                alt=""
              />
              <h1 className="font-bold text-2xl ">Footwear</h1>
              <p className="text-center text-sm md:text-xl">
                Perfect pair for any occasion
              </p>
            </div>
          </Slide>
          <Slide direction="right" delay={1200} className="h-full" triggerOnce>
            <div className="h-full flex flex-col items-center pb-5 rounded-xl shadow-[0_4px_8px_0_rgba(0,0,0,0.2)] transition-all hover:shadow-[0_8px_14px_0_rgba(0,0,0,0.2)]">
              <img className="h-14 sm:h-20 md:h-24 my-4" src={books} alt="" />
              <h1 className="font-bold text-2xl ">Books</h1>
              <p className="text-center text-sm md:text-xl">
                World of knowledge and imagination
              </p>
            </div>
          </Slide>
        </div>
      </Fade>
    </div>
  );
}
