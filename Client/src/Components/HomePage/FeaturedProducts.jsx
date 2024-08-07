import React from "react";
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
            Featured Products
          </h1>
          <p className="lg:pl-6 lg:w-2/3 mx-auto leading-relaxed text-base">
            Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical
            gentrify, subway tile poke farm-to-table. Franzen you probably
            havent heard of them man bun deep jianbing selfies heirloom.
          </p>
        </div>
        <div className="flex flex-col md:flex-row flex-wrap md:-m-2 -m-1">
          <div className="flex flex-wrap md:w-1/2">
            <div className="md:p-2 p-1 w-1/2">
              <img
                alt="gallery"
                className="w-full object-cover h-full object-center rounded-xl shadow-[0_4px_8px_0_rgba(0,0,0,0.2)] transition-all hover:shadow-[0_8px_14px_0_rgba(0,0,0,0.2)]"
                src={footwear1}
              />
            </div>
            <div className="md:p-2 p-1 w-1/2">
              <img
                alt="gallery"
                className="w-full object-cover h-full object-center block rounded-xl shadow-[0_4px_8px_0_rgba(0,0,0,0.2)] transition-all hover:shadow-[0_8px_14px_0_rgba(0,0,0,0.2)]"
                src={footwear2}
              />
            </div>
            <div className="md:p-2 p-1 w-full">
              <img
                alt="gallery"
                className="w-full h-full object-cover object-center block rounded-xl shadow-[0_4px_8px_0_rgba(0,0,0,0.2)] transition-all hover:shadow-[0_8px_14px_0_rgba(0,0,0,0.2)]"
                src={clothing}
              />
            </div>
          </div>
          <div className="flex flex-wrap md:w-1/2">
            <div className="md:p-2 p-1 w-full">
              <img
                alt="gallery"
                className="w-full h-full object-cover object-center block rounded-xl shadow-[0_4px_8px_0_rgba(0,0,0,0.2)] transition-all hover:shadow-[0_8px_14px_0_rgba(0,0,0,0.2)]"
                src={electronics}
              />
            </div>
            <div className="md:p-2 p-1 w-1/2">
              <img
                alt="gallery"
                className="w-full object-cover h-full object-center block rounded-xl shadow-[0_4px_8px_0_rgba(0,0,0,0.2)] transition-all hover:shadow-[0_8px_14px_0_rgba(0,0,0,0.2)]"
                src={book1}
              />
            </div>
            <div className="md:p-2 p-1 w-1/2">
              <img
                alt="gallery"
                className="w-full object-cover h-full object-center block rounded-xl shadow-[0_4px_8px_0_rgba(0,0,0,0.2)] transition-all hover:shadow-[0_8px_14px_0_rgba(0,0,0,0.2)]"
                src={book2}
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    // <div className="my-28 bg-slate-50">
    //   <div className="flex justify-center">
    //     <h1 className="text-2xl md:text-3xl lg:text-5xl p-6 text-[#00df9a]">
    //       Featured Products
    //     </h1>
    //   </div>
    //   <div className="grid grid-cols-1 lg:grid-cols-2">
    //     <div className="bg-red-600 text-white w-full p-8 flex justify-between">
    //       <div className="w-[70%] flex flex-col p-2 md:p-4 gap-3 md:gap-10">
    //         <h1 className="md:text-4xl font-bold">Durable Boots</h1>
    //         <p className="text-sm md:text-xl text-justify">
    //           Gear up for any adventure with our sturdy and reliable boots.
    //         </p>
    //         <button
    //           type="button"
    //           className="flex items-center w-fit text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 shadow-lg shadow-blue-500/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 "
    //         >
    //           Shop Now{" "}
    //           <svg
    //             className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
    //             aria-hidden="true"
    //             xmlns="http://www.w3.org/2000/svg"
    //             fill="none"
    //             viewBox="0 0 14 10"
    //           >
    //             <path
    //               stroke="currentColor"
    //               strokeLinecap="round"
    //               strokeLinejoin="round"
    //               strokeWidth={2}
    //               d="M1 5h12m0 0L9 1m4 4L9 9"
    //             />
    //           </svg>
    //         </button>
    //       </div>
    //       <img className="w-[40%] h-fit my-auto" src={footwear} alt="" />
    //     </div>
    //     <div className="bg-black text-white w-full p-8 flex justify-between flex-row-reverse">
    //       <div className="w-[70%] flex flex-col p-2 md:p-4 gap-3 md:gap-10">
    //         <h1 className="md:text-4xl font-bold">Latest Smart Watches</h1>
    //         <p className="text-sm md:text-xl text-justify">
    //           Stay connected with the newest smart atches featuring cutting-edge
    //           technology.
    //         </p>
    //         <button
    //           type="button"
    //           className="flex items-center w-fit text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 shadow-lg shadow-blue-500/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 "
    //         >
    //           Shop Now{" "}
    //           <svg
    //             className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
    //             aria-hidden="true"
    //             xmlns="http://www.w3.org/2000/svg"
    //             fill="none"
    //             viewBox="0 0 14 10"
    //           >
    //             <path
    //               stroke="currentColor"
    //               strokeLinecap="round"
    //               strokeLinejoin="round"
    //               strokeWidth={2}
    //               d="M1 5h12m0 0L9 1m4 4L9 9"
    //             />
    //           </svg>
    //         </button>
    //       </div>
    //       <img className="w-[40%] h-fit my-auto" src={electronics} alt="" />
    //     </div>
    //     <div className="bg-yellow-300 text-white w-full p-8 flex justify-between">
    //       <div className="w-[70%] flex flex-col p-2 md:p-4 gap-3 md:gap-10">
    //         <h1 className="md:text-4xl font-bold">Casual Everyday Outfits</h1>
    //         <p className="text-sm md:text-xl text-justify">
    //           Discover the perfect blend of comfort and style for your daily
    //           wear.
    //         </p>
    //         <button
    //           type="button"
    //           className="flex items-center w-fit text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 shadow-lg shadow-blue-500/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
    //         >
    //           Shop Now{" "}
    //           <svg
    //             className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
    //             aria-hidden="true"
    //             xmlns="http://www.w3.org/2000/svg"
    //             fill="none"
    //             viewBox="0 0 14 10"
    //           >
    //             <path
    //               stroke="currentColor"
    //               strokeLinecap="round"
    //               strokeLinejoin="round"
    //               strokeWidth={2}
    //               d="M1 5h12m0 0L9 1m4 4L9 9"
    //             />
    //           </svg>
    //         </button>
    //       </div>
    //       <img className="w-[40%] h-fit my-auto" src={clothing} alt="" />
    //     </div>
    //     <div className="bg-green-500 text-white w-full p-8 flex justify-between flex-row-reverse">
    //       <div className="w-[70%] flex flex-col p-2 md:p-4 gap-3 md:gap-10">
    //         <h1 className="md:text-4xl font-bold">Inspirational Self-Help</h1>
    //         <p className="text-sm md:text-xl text-justify">
    //           Empower yourself with our range of motivational and self-help
    //           books.
    //         </p>
    //         <button
    //           type="button"
    //           className="flex items-center w-fit text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 shadow-lg shadow-blue-500/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 "
    //         >
    //           Shop Now{" "}
    //           <svg
    //             className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
    //             aria-hidden="true"
    //             xmlns="http://www.w3.org/2000/svg"
    //             fill="none"
    //             viewBox="0 0 14 10"
    //           >
    //             <path
    //               stroke="currentColor"
    //               strokeLinecap="round"
    //               strokeLinejoin="round"
    //               strokeWidth={2}
    //               d="M1 5h12m0 0L9 1m4 4L9 9"
    //             />
    //           </svg>
    //         </button>
    //       </div>
    //       <img className="w-[40%] h-fit my-auto" src={books} alt="" />
    //     </div>
    //   </div>
    // </div>
  );
}
