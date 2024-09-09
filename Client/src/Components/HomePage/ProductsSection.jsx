import React from "react";
import { AttentionSeeker, Fade, Slide, Zoom } from "react-awesome-reveal";
import clothes1 from "../../assets/gallery/clothes1.avif";
import clothes2 from "../../assets/gallery/clothes2.avif";
import clothes3 from "../../assets/gallery/clothes3.webp";
import electronics1 from "../../assets/gallery/electronics1.avif";
import electronics2 from "../../assets/gallery/electronics2.avif";
import electronics3 from "../../assets/gallery/electronics3.avif";
import books1 from "../../assets/gallery/books1.avif";
import books2 from "../../assets/gallery/books2.avif";
import books3 from "../../assets/gallery/books3.avif";
import footwear1 from "../../assets/gallery/footwear1.avif";
import footwear2 from "../../assets/gallery/footwear2.avif";
import footwear3 from "../../assets/gallery/footwear3.avif";
import { Link } from "react-router-dom";

export default function ProductsSection() {
  return (
    <div className="w-full flex flex-col-reverse lg:flex-row justify-evenly gap-10 lg:gap-0">
      <div className="lg:w-[40%] m-2 columns-4">
        <Zoom>
          <div>
            <img
              className="mb-2 rounded-xl shadow-[0_4px_8px_0_rgba(0,0,0,0.2)] transition-all hover:shadow-[0_8px_14px_0_rgba(0,0,0,0.2)]"
              src={clothes2}
              alt=""
            />
          </div>
          <div>
            <img
              className="mb-2 rounded-xl shadow-[0_4px_8px_0_rgba(0,0,0,0.2)] transition-all hover:shadow-[0_8px_14px_0_rgba(0,0,0,0.2)]"
              src={books1}
              alt=""
            />
          </div>
          <div>
            <img
              className="mb-2 rounded-xl shadow-[0_4px_8px_0_rgba(0,0,0,0.2)] transition-all hover:shadow-[0_8px_14px_0_rgba(0,0,0,0.2)]"
              src={electronics1}
              alt=""
            />
          </div>
          <div>
            <img
              className="mb-2 rounded-xl shadow-[0_4px_8px_0_rgba(0,0,0,0.2)] transition-all hover:shadow-[0_8px_14px_0_rgba(0,0,0,0.2)]"
              src={footwear3}
              alt=""
            />
          </div>
          <div>
            <img
              className="mb-2 rounded-xl shadow-[0_4px_8px_0_rgba(0,0,0,0.2)] transition-all hover:shadow-[0_8px_14px_0_rgba(0,0,0,0.2)]"
              src={clothes1}
              alt=""
            />
          </div>
          <div>
            <img
              className="mb-2 rounded-xl shadow-[0_4px_8px_0_rgba(0,0,0,0.2)] transition-all hover:shadow-[0_8px_14px_0_rgba(0,0,0,0.2)]"
              src={electronics3}
              alt=""
            />
          </div>
          <div>
            <img
              className="mb-2 rounded-xl shadow-[0_4px_8px_0_rgba(0,0,0,0.2)] transition-all hover:shadow-[0_8px_14px_0_rgba(0,0,0,0.2)]"
              src={footwear2}
              alt=""
            />
          </div>
          <div>
            <img
              className="mb-2 rounded-xl shadow-[0_4px_8px_0_rgba(0,0,0,0.2)] transition-all hover:shadow-[0_8px_14px_0_rgba(0,0,0,0.2)]"
              src={books2}
              alt=""
            />
          </div>
          <div>
            <img
              className="mb-2 rounded-xl shadow-[0_4px_8px_0_rgba(0,0,0,0.2)] transition-all hover:shadow-[0_8px_14px_0_rgba(0,0,0,0.2)]"
              src={clothes3}
              alt=""
            />
          </div>
          <div>
            <img
              className="mb-2 rounded-xl shadow-[0_4px_8px_0_rgba(0,0,0,0.2)] transition-all hover:shadow-[0_8px_14px_0_rgba(0,0,0,0.2)]"
              src={electronics2}
              alt=""
            />
          </div>
          <div>
            <img
              className="mb-2 rounded-xl shadow-[0_4px_8px_0_rgba(0,0,0,0.2)] transition-all hover:shadow-[0_8px_14px_0_rgba(0,0,0,0.2)]"
              src={footwear1}
              alt=""
            />
          </div>
          <div>
            <img
              className="mb-2 rounded-xl shadow-[0_4px_8px_0_rgba(0,0,0,0.2)] transition-all hover:shadow-[0_8px_14px_0_rgba(0,0,0,0.2)]"
              src={books3}
              alt=""
            />
          </div>
        </Zoom>
      </div>
      <div className="lg:w-[40%] m-1 flex flex-col justify-center space-y-5">
        <h1 className="text-2xl md:text-4xl m-2">
          <Fade direction="down">
            Unlock Exclusive Savings and Start Your Ultimate Shopping Spree
          </Fade>
        </h1>

        <Fade direction="right" className="text-sm md:text-lg m-2 text-justify">
          <p>
            Unlock amazing savings with our hand-picked promotional offers! From
            cutting-edge electronics to stylish apparel and must-read books, our
            exclusive deals offer top-quality items at unbeatable prices. Act
            now—these offers are available for a limited time only. Shop today
            and experience ultimate value!
          </p>
        </Fade>

        <Link to="/fresh-products">
          <AttentionSeeker effect="bounce">
            <button
              type="button"
              className="text-white self-center lg:self-start w-fit m-2 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300  shadow-lg shadow-blue-500/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 "
            >
              <Link to="/fresh-products">{`Let's Start!`}</Link>
            </button>
          </AttentionSeeker>
        </Link>
      </div>
    </div>
  );
}
