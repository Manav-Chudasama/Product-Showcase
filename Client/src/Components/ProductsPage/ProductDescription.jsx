import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, FreeMode, Thumbs, EffectFade } from "swiper/modules";
import ProductReviews from "./ProductReviews";
import { useParams, useLocation } from "react-router-dom";
import { FaRegHeart, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { addToWishlist } from "../../utils/api/wishlistApi";
import { useUser } from "@clerk/clerk-react";
import { addToShoppingCart } from "../../utils/api/shoppingCartApi";
import { calculateRatings, getProductReviews } from "../../utils/api/reviewApi";
import axios from "axios";
import { Fade } from "react-awesome-reveal";
import AlertBox from "../../utils/parts/AlertBox";

export default function ProductDescription() {
  const { user } = useUser();
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [ratingStats, setRatingStats] = useState({
    averageRating: 0,
    totalReviews: 0,
    ratingCounts: [0, 0, 0, 0, 0], // [1-star, 2-star, 3-star, 4-star, 5-star]
  });
  const [alert, setAlert] = useState({ message: "", type: "" });
  const location = useLocation();
  const { product, productType } = location.state || {};
  // console.log(typeof product, productType);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchReviews();
  }, []);

  if (!product || !productType) {
    return <div>Product data is unavailable.</div>;
  }

  const handleWishlist = async () => {
    // console.log("product: ", product._id, "userid: ", user.id);
    try {
      const response = await addToWishlist(user.id, product._id, productType);
      console.log(response.data);
      showAlert(response.data.message, "success");
    } catch (error) {
      console.log(error);
      showAlert("Failed to add product to wishlist.", "error");
    }
  };

  const handleShoppingCart = async () => {
    try {
      const response = await addToShoppingCart(
        user.id,
        product._id,
        productType
      );
      console.log(response.data);
      showAlert(response.data.message, "success");
    } catch (error) {
      console.log(error);
      showAlert("Failed to add product to Shopping Cart.", "error");
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await getProductReviews(product, productType);
      console.log(response.data);
      setReviews(response.data.reviews);
      const stats = calculateRatings(response.data.reviews);
      setRatingStats(stats);
    } catch (error) {
      console.log(error);
    }
  };

  const showAlert = (message, type) => {
    setAlert({ message, type });
    setTimeout(() => setAlert({ message: "", type: "" }), 3000);
  };

  // const calculateRatings = (reviews) => {
  //   let totalRating = 0;
  //   const ratingCounts = [0, 0, 0, 0, 0];

  //   reviews.forEach((review) => {
  //     totalRating += review.rating;
  //     ratingCounts[review.rating - 1] += 1;
  //   });

  //   const averageRating = totalRating / reviews.length;

  //   setRatingStats({
  //     averageRating: averageRating.toFixed(2),
  //     totalReviews: reviews.length,
  //     ratingCounts,
  //   });
  // };

  const renderStars = (averageRating) => {
    if (isNaN(averageRating) || averageRating < 0 || averageRating > 5) {
      averageRating = 0; // Fallback to 0 if the value is invalid
    }

    const fullStars = Math.floor(averageRating);
    const hasHalfStar = averageRating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <>
        {[...Array(fullStars)].map((_, index) => (
          <FaStar key={`full-${index}`} color="#FACA15" />
        ))}
        {hasHalfStar && <FaStarHalfAlt color="#FACA15" />}
        {[...Array(emptyStars)].map((_, index) => (
          <FaStar key={`empty-${index}`} color="#E5E7EB" />
        ))}
      </>
    );
  };

  return (
    <div>
      <Fade delay={100}>
        <section className="py-8 bg-white md:py-16 antialiased">
          <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
            <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
              <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
                <div className="w-full">
                  <Swiper
                    modules={[Navigation, Thumbs, EffectFade]}
                    loop={true}
                    spaceBetween={32}
                    effect="fade"
                    thumbs={{
                      swiper:
                        thumbsSwiper && !thumbsSwiper.destroyed
                          ? thumbsSwiper
                          : null,
                    }}
                    className="product-prev mb-6"
                  >
                    {product.images.map((image, index) => (
                      <SwiperSlide key={index}>
                        <img
                          src={`http://localhost:4000/${image}`}
                          alt={product.title}
                          className="mx-auto h-96"
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>

                  <Swiper
                    modules={[Thumbs, FreeMode, Navigation]}
                    onSwiper={setThumbsSwiper}
                    loop={true}
                    spaceBetween={12}
                    slidesPerView={3}
                    freeMode={true}
                    watchSlidesProgress={true}
                    className=""
                  >
                    {product.images.map((image, index) => (
                      <SwiperSlide key={index}>
                        <img
                          src={`http://localhost:4000/${image}`}
                          alt={product.title}
                          className="cursor-pointer border-2 border-gray-50 transition-all duration-500 hover:border-indigo-600"
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
              <div className="mt-6 sm:mt-8 lg:mt-0">
                <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">
                  {product.title}
                </h1>
                <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
                  <p className="text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white">
                    ₹{product.price}
                  </p>
                  <div className="flex items-center gap-2 mt-2 sm:mt-0">
                    <div className="flex items-center gap-1">
                      {renderStars(ratingStats.averageRating)}
                    </div>
                    <p className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">
                      (
                      {isNaN(ratingStats.averageRating)
                        ? 0
                        : ratingStats.averageRating}
                      )
                    </p>
                    <a
                      href="#"
                      className="text-sm font-medium leading-none text-gray-900 underline hover:no-underline dark:text-white"
                    >
                      {product.reviews.length} Reviews
                    </a>
                  </div>
                </div>
                <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
                  <button
                    type="button"
                    className="flex items-center justify-center py-2.5 px-5 text-sm font-medium text-white hover:outline-none bg-black rounded-lg border border-gray-200 focus:z-10 hover:ring-4 hover:ring-gray-100 hover:shadow-[0_4px_8px_0_rgba(0,0,0,0.2)]"
                    onClick={handleWishlist}
                  >
                    <FaRegHeart className="mr-2" />
                    Add to favorites
                  </button>
                  <button
                    type="button"
                    className="text-white mt-4 sm:mt-0 bg-blue-700 hover:bg-primary-800 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center justify-center hover:shadow-[0_4px_8px_0_rgba(0,0,0,0.2)]"
                    onClick={handleShoppingCart}
                  >
                    <svg
                      className="w-5 h-5 -ms-2 me-2"
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"
                      />
                    </svg>
                    Add to cart
                  </button>
                </div>
                <hr className="my-6 md:my-8 border-gray-200" />
                <p className="mb-6 text-gray-500">{product.description}</p>
              </div>
            </div>
          </div>
        </section>
      </Fade>
      <ProductReviews
        product={product}
        productType={productType}
        reviews={reviews}
        ratingStats={ratingStats}
        renderStars={renderStars}
      />
      {alert.message && (
        <AlertBox
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert({ message: "", type: "" })}
        />
      )}
    </div>
  );
}
