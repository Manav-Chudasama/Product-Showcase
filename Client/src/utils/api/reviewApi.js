// import React from "react";
import axios from "axios";
// import { FaStar, FaStarHalfAlt } from "react-icons/fa";

export const getProductReviews = async (product, productType) => {
  try {
    productType = productType == "Fresh Product" ? "fresh" : "thrift";
    const response = await axios.get(
      `http://localhost:4000/api/review/get-product-reviews/${product._id}/${productType}`
    );
    // console.log(response.data.reviews);
    // setReviews(response.data.reviews);
    // calculateRatings(response.data.reviews);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const calculateRatings = (reviews) => {
  let totalRating = 0;
  const ratingCounts = [0, 0, 0, 0, 0];

  reviews.forEach((review) => {
    totalRating += review.rating;
    ratingCounts[review.rating - 1] += 1;
  });

  const averageRating = totalRating / reviews.length;

  return {
    averageRating: averageRating.toFixed(2),
    totalReviews: reviews.length,
    ratingCounts,
  };
};

// export const renderStars = (averageRating) => {
//   if (isNaN(averageRating) || averageRating < 0 || averageRating > 5) {
//     averageRating = 0; // Fallback to 0 if the value is invalid
//   }

//   const fullStars = Math.floor(averageRating);
//   const hasHalfStar = averageRating % 1 >= 0.5;
//   const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

//   return (
//     <>
//       {[...Array(fullStars)].map((_, index) => (
//         <FaStar key={`full-${index}`} color="#FACA15" />
//       ))}
//       {hasHalfStar && <FaStarHalfAlt color="#FACA15" />}
//       {[...Array(emptyStars)].map((_, index) => (
//         <FaStar key={`empty-${index}`} color="#E5E7EB" />
//       ))}
//     </>
//   );
// };
