import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import Header from "../Navigation/Header";
import Logo from "../../assets/Logo.png";
import { SiCodefresh } from "react-icons/si";
import { GiAbstract014 } from "react-icons/gi";
import { MdOutlineCategory } from "react-icons/md";
import { FaStar, FaRegHeart, FaStarHalfAlt } from "react-icons/fa";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";
import { addToWishlist } from "../../utils/api/wishlistApi";
import { addToShoppingCart } from "../../utils/api/shoppingCartApi";
import { calculateRatings, getProductReviews } from "../../utils/api/reviewApi";
// import { getProductReviews } from "../../utils/api/reviewApi";

export default function ProductCard({ product, productType }) {
  const { user } = useUser();
  const [reviews, setReviews] = useState([]);
  const [ratingStats, setRatingStats] = useState({
    averageRating: 0,
    totalReviews: 0,
    ratingCounts: [0, 0, 0, 0, 0], // [1-star, 2-star, 3-star, 4-star, 5-star]
  });
  const navigate = useNavigate();
  const handleClick = (event) => {
    navigate(`/product-description/${product._id}/${productType}`, {
      state: { product, productType },
    });
  };

  const handleAddToWishlist = async () => {
    // console.log("product: ", product._id, "userid: ", user.id);
    try {
      const response = await addToWishlist(user.id, product._id, productType);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddToShoppingCart = async () => {
    console.log("shopping");
    try {
      const response = await addToShoppingCart(
        user.id,
        product._id,
        productType
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
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

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div
      className="flex flex-col justify-between rounded-lg border border-gray-200 bg-white p-6 shadow-sm cursor-pointer"
      onClick={handleClick}
    >
      <div>
        <div className="h-56 w-full">
          <>
            <img
              className="mx-auto h-full dark:hidden"
              src={`http://localhost:4000/${product.images[0]}`}
              alt={product.title}
            />
          </>
        </div>
        <div className="pt-6">
          <div className="mb-4 flex items-center justify-between gap-4">
            <span className="me-2 rounded bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-300">
              {productType == "Fresh Product"
                ? null
                : `Product by ${product.username}`}
            </span>
            <div className="flex items-center justify-end gap-1">
              <button
                type="button"
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent navigating when clicking the heart
                  handleAddToWishlist();
                }}
              >
                <span className="sr-only">Add to Favorites</span>
                <FaRegHeart />
              </button>
            </div>
          </div>
          <a
            href="#"
            className="text-lg font-semibold leading-tight text-gray-900 hover:underline"
          >
            {product.title}
          </a>
          <div className="mt-2 flex items-center gap-2">
            <div className="flex items-center">
              {renderStars(ratingStats.averageRating)}
            </div>
            <p className="text-sm font-medium text-gray-900">
              (
              {isNaN(ratingStats.averageRating) ? 0 : ratingStats.averageRating}
              )
            </p>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              ({product.reviews.length})
            </p>
          </div>
          <ul className="mt-2 flex items-center gap-4">
            <li className="flex items-center gap-2">
              {productType == "Fresh Product" ? (
                <SiCodefresh color="green" />
              ) : (
                <GiAbstract014 color="green" />
              )}

              <p className="text-sm font-medium text-blue-600 dark:text-gray-400">
                {productType}
              </p>
            </li>
            <li className="flex items-center gap-2">
              <MdOutlineCategory color="red" />
              <p className="text-sm font-medium text-red-500 dark:text-gray-400">
                {product.category}
              </p>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between gap-4">
        <p className="text-2xl font-bold leading-tight text-gray-900 dark:text-white">
          ₹{product.price}
        </p>
        <button
          type="button"
          className="inline-flex items-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none hover:ring-4  hover:ring-blue-200"
          onClick={(e) => {
            e.stopPropagation(); // Prevent navigating when clicking on the add to cart button
            handleAddToShoppingCart();
          }}
        >
          <svg
            className="-ms-2 me-2 h-5 w-5"
            aria-hidden="true"
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
    </div>
  );
}

ProductCard.propTypes = {
  // key: PropTypes.number,
  product: PropTypes.object.isRequired,
  productType: PropTypes.string.isRequired,
};
