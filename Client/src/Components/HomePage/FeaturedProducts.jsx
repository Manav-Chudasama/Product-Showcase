import React from "react";
import { Fade, Slide, Zoom } from "react-awesome-reveal";
import clothing from "../../assets/featuredProducts/clothing.avif";
import electronics from "../../assets/featuredProducts/electronics.avif";
import footwear1 from "../../assets/featuredProducts/footwear1.avif";
import footwear2 from "../../assets/featuredProducts/footwear2.avif";
import book1 from "../../assets/featuredProducts/book1.avif";
import book2 from "../../assets/featuredProducts/book2.avif";

export default function FeaturedProducts() {
  return (
    <section className="body-font">
      <div className="container px-5 py-24 mx-auto flex flex-wrap">
        <div className="flex w-full mb-20 flex-wrap">
          <h1 className="sm:text-3xl text-2xl text-blue-600 font-bold lg:w-1/3 lg:mb-0 mb-4">
            <Slide direction="left">Featured Products</Slide>
          </h1>
          <Fade
            direction="up"
            className="lg:pl-6 lg:w-2/3 mx-auto leading-relaxed text-base"
          >
            <p>
              Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical
              gentrify, subway tile poke farm-to-table. Franzen you probably
              havent heard of them man bun deep jianbing selfies heirloom.
            </p>
          </Fade>
        </div>
        <div className="flex flex-col md:flex-row flex-wrap md:-m-2 -m-1">
          <div className="flex flex-wrap md:w-1/2">
            <div className="md:p-2 p-1 w-1/2">
              <Slide direction="left" triggerOnce>
                <img
                  alt="gallery"
                  className="w-full object-cover h-full object-center rounded-xl shadow-[0_4px_8px_0_rgba(0,0,0,0.2)] transition-all hover:shadow-[0_8px_14px_0_rgba(0,0,0,0.2)]"
                  src={footwear1}
                />
              </Slide>
            </div>
            <div className="md:p-2 p-1 w-1/2">
              <Slide direction="right" triggerOnce>
                <img
                  alt="gallery"
                  className="w-full object-cover h-full object-center block rounded-xl shadow-[0_4px_8px_0_rgba(0,0,0,0.2)] transition-all hover:shadow-[0_8px_14px_0_rgba(0,0,0,0.2)]"
                  src={footwear2}
                />
              </Slide>
            </div>
            <div className="md:p-2 p-1 w-full">
              <Zoom triggerOnce>
                <img
                  alt="gallery"
                  className="w-full h-full object-cover object-center block rounded-xl shadow-[0_4px_8px_0_rgba(0,0,0,0.2)] transition-all hover:shadow-[0_8px_14px_0_rgba(0,0,0,0.2)]"
                  src={clothing}
                />
              </Zoom>
            </div>
          </div>
          <div className="flex flex-wrap md:w-1/2">
            <div className="md:p-2 p-1 w-full">
              <Zoom className="h-full" triggerOnce>
                <img
                  alt="gallery"
                  className="w-full h-full object-cover object-center block rounded-xl shadow-[0_4px_8px_0_rgba(0,0,0,0.2)] transition-all hover:shadow-[0_8px_14px_0_rgba(0,0,0,0.2)]"
                  src={electronics}
                />
              </Zoom>
            </div>
            <div className="md:p-2 p-1 w-1/2">
              <Slide direction="left" className="h-full" triggerOnce>
                <img
                  alt="gallery"
                  className="w-full object-cover h-full object-center block rounded-xl shadow-[0_4px_8px_0_rgba(0,0,0,0.2)] transition-all hover:shadow-[0_8px_14px_0_rgba(0,0,0,0.2)]"
                  src={book1}
                />
              </Slide>
            </div>
            <div className="md:p-2 p-1 w-1/2">
              <Slide direction="right" className="h-full" triggerOnce>
                <img
                  alt="gallery"
                  className="w-full object-cover h-full object-center block rounded-xl shadow-[0_4px_8px_0_rgba(0,0,0,0.2)] transition-all hover:shadow-[0_8px_14px_0_rgba(0,0,0,0.2)]"
                  src={book2}
                />
              </Slide>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
