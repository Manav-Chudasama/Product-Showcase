/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { Fade, Flip, Slide } from "react-awesome-reveal";

export default function ContactUs() {
  return (
    <div>
      <section className="body-font relative">
        <div className="container px-5 py-24 mx-auto">
          <div className="py-10 px-3 rounded-xl shadow-[0_4px_8px_0_rgba(0,0,0,0.2)] transition-all hover:shadow-[0_8px_14px_0_rgba(0,0,0,0.2)]">
            <div className="flex flex-col text-center mb-12">
              <h1 className="sm:text-3xl text-2xl text-blue-600 font-bold title-font mb-4">
                <Slide direction="down">Contact Us</Slide>
              </h1>
              <Slide
                direction="up"
                className="lg:w-2/3 mx-auto leading-relaxed text-sm md:text-base"
              >
                <p>
                  Need assistance? Our friendly team is here to help! Reach out
                  for inquiries, support, or feedback. We're dedicated to
                  ensuring your best shopping experience. Let's connect!
                </p>
              </Slide>
            </div>
            <div className="lg:w-1/2 md:w-2/3 mx-auto">
              <div className="flex flex-wrap -m-2">
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <Slide direction="left" triggerOnce>
                      <label htmlFor="name" className="leading-7 text-sm">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="w-full  bg-opacity-40 rounded border border-gray-700 focus:border-blue-700  focus:ring-2 focus:ring-blue-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      />
                    </Slide>
                  </div>
                </div>
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <Slide direction="right" triggerOnce>
                      <label htmlFor="email" className="leading-7 text-sm">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="w-full  bg-opacity-40 rounded border border-gray-700 focus:border-blue-700  focus:ring-2 focus:ring-blue-500 text-base outline-none  py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      />
                    </Slide>
                  </div>
                </div>
                <div className="p-2 w-full">
                  <div className="relative">
                    <Slide direction="up" triggerOnce>
                      <label htmlFor="message" className="leading-7 text-sm ">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        className="w-full  bg-opacity-40 rounded border border-gray-700 focus:border-blue-700  focus:ring-2 focus:ring-blue-500 h-32 text-base outline-none  py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                        defaultValue={""}
                      />
                    </Slide>
                  </div>
                </div>
                <Fade className="p-2 w-full">
                  <button className="flex mx-auto text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300  shadow-lg shadow-blue-500/50 border-0 ont-medium rounded-lg text-lg px-8 py-1.5">
                    Connect!
                  </button>
                </Fade>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
