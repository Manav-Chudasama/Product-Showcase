import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import AddReviewModal from "./AddReviewModal";
import axios from "axios";
export default function ProductReviews({
  product,
  productType,
  reviews,
  ratingStats,
  renderStars,
}) {
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <section className="bg-white py-8 antialiased md:py-16">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-semibold text-gray-900">Reviews</h2>
            <div className="mt-2 flex items-center gap-2 sm:mt-0">
              <div className="flex items-center gap-0.5">
                {renderStars(ratingStats.averageRating)}
              </div>
              <p className="text-sm font-medium leading-none text-gray-500">
                (
                {isNaN(ratingStats.averageRating)
                  ? 0
                  : ratingStats.averageRating}
                )
              </p>
              <a className="text-sm font-medium leading-none text-gray-900 underline hover:no-underline">
                {reviews.length} Reviews
              </a>
            </div>
          </div>
          <div className="my-6 gap-8 sm:flex sm:items-start md:my-8">
            <div className="shrink-0 space-y-4">
              <p className="text-2xl font-semibold leading-none text-gray-900">
                {isNaN(ratingStats.averageRating)
                  ? 0
                  : ratingStats.averageRating}{" "}
                out of 5
              </p>
              <button
                type="button"
                data-modal-target="review-modal"
                data-modal-toggle="review-modal"
                className="mb-2 me-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-primary-300"
                onClick={(e) => setOpenModal(!openModal)}
              >
                Write a review
              </button>
            </div>
            <div className="mt-6 min-w-0 flex-1 space-y-3 sm:mt-0">
              {ratingStats.ratingCounts.map((count, index) => (
                <div key={index} className="flex items-center gap-2">
                  <p className="w-2 shrink-0 text-start text-sm font-medium leading-none text-gray-900">
                    {5 - index}
                  </p>
                  <FaStar color="#FACA15" />
                  <div className="h-1.5 w-80 rounded-full bg-gray-200">
                    <div
                      className="h-1.5 rounded-full bg-yellow-300"
                      style={{
                        width: `${(count / ratingStats.totalReviews) * 100}%`,
                      }}
                    />
                  </div>
                  <a
                    href="#"
                    className="w-8 shrink-0 text-right text-sm font-medium leading-none text-primary-700 hover:underline dark:text-primary-500 sm:w-auto sm:text-left"
                  >
                    {count} <span className="hidden sm:inline">reviews</span>
                  </a>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6 divide-y divide-gray-200">
            {reviews &&
              reviews.map((review, index) => (
                <div
                  key={index}
                  className={`gap-3 ${
                    index == 0 ? `pb-6` : `py-6`
                  } sm:flex sm:items-start`}
                >
                  <div className="shrink-0 space-y-2 sm:w-48 md:w-72">
                    <div className="flex items-center gap-0.5">
                      {[...Array(review.rating)].map((_, i) => (
                        <FaStar key={i} color="#FACA15" />
                      ))}
                      {[...Array(5 - review.rating)].map((_, i) => (
                        <FaStar key={i} color="#e4e4e4" />
                      ))}
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-base font-semibold text-gray-900 dark:text-white">
                        {review.username}
                      </p>
                      <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                        {new Date(review.timestamp).toLocaleString()}
                      </p>
                    </div>
                    <div className="inline-flex items-center gap-1">
                      <svg
                        className="h-5 w-5 text-blue-700"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12 2c-.791 0-1.55.314-2.11.874l-.893.893a.985.985 0 0 1-.696.288H7.04A2.984 2.984 0 0 0 4.055 7.04v1.262a.986.986 0 0 1-.288.696l-.893.893a2.984 2.984 0 0 0 0 4.22l.893.893a.985.985 0 0 1 .288.696v1.262a2.984 2.984 0 0 0 2.984 2.984h1.262c.261 0 .512.104.696.288l.893.893a2.984 2.984 0 0 0 4.22 0l.893-.893a.985.985 0 0 1 .696-.288h1.262a2.984 2.984 0 0 0 2.984-2.984V15.7c0-.261.104-.512.288-.696l.893-.893a2.984 2.984 0 0 0 0-4.22l-.893-.893a.985.985 0 0 1-.288-.696V7.04a2.984 2.984 0 0 0-2.984-2.984h-1.262a.985.985 0 0 1-.696-.288l-.893-.893A2.984 2.984 0 0 0 12 2Zm3.683 7.73a1 1 0 1 0-1.414-1.413l-4.253 4.253-1.277-1.277a1 1 0 0 0-1.415 1.414l1.985 1.984a1 1 0 0 0 1.414 0l4.96-4.96Z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        Verified purchase
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 min-w-0 flex-1 space-y-4 sm:mt-0">
                    <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                      {review.description}
                    </p>
                  </div>
                </div>
              ))}
          </div>
          {/* <div className="mt-6 text-center">
            <button
              type="button"
              className="mb-2 me-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
            >
              View more reviews
            </button>
          </div> */}
        </div>
      </section>
      {/* Add review modal */}
      <AddReviewModal
        product={product}
        productType={productType}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </>
  );
}

ProductReviews.propTypes = {
  product: PropTypes.object.isRequired,
  productType: PropTypes.string.isRequired,
  reviews: PropTypes.array.isRequired,
  ratingStats: PropTypes.arrayOf(PropTypes.object).isRequired,
  renderStars: PropTypes.func.isRequired,
};
