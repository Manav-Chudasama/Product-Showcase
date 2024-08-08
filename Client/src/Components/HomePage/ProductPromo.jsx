import React from "react";
import img from "../../assets/promo.avif";
import { Link } from "react-router-dom";
import { Fade, Zoom } from "react-awesome-reveal";

export default function ProductPromo() {
  return (
    <>
      <section className="bg-gray-100 mt-12 p-5 lg:py-12 lg:flex lg:justify-center">
        <Fade>
          <Zoom triggerOnce>
            <div className="overflow-hidden bg-white lg:mx-8 lg:flex lg:max-w-6xl lg:w-full lg:shadow-md lg:rounded-xl rounded-xl shadow-[0_4px_8px_0_rgba(0,0,0,0.2)] transition-all hover:shadow-[0_8px_14px_0_rgba(0,0,0,0.2)]">
              <div className="lg:w-1/2">
                {/* <img src={img} className="h-64" alt="" /> */}
                <div
                  className="h-64 bg-cover lg:h-full"
                  style={{
                    backgroundImage: `url(${img})`,
                    backgroundPosition: "center",
                  }}
                />
              </div>
              <div className="w-full px-6 py-12 lg:max-w-5xl lg:w-1/2">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">
                  Share Your{" "}
                  <span className="text-blue-700 font-bold">Products</span> with
                  the World
                </h2>
                <p className="mt-4 text-justify">
                  Got something to sell? Join our community by uploading your
                  products today! Whether {`it's`} new or gently used, our
                  platform makes it easy to reach a wider audience and turn your
                  items into cash. Start sharing now and connect with buyers who
                  are looking for exactly what you have to offer.
                </p>
                <div className="flex justify-center md:justify-start w-full mt-6 sm:w-auto">
                  <Link to="/add-product">
                    <button
                      type="button"
                      className="text-white w-full self-center lg:self-start md:w-fit m-2 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300  shadow-lg shadow-blue-500/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 "
                    >
                      {`Upload Product!`}
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </Zoom>
        </Fade>
      </section>
    </>
  );
}
