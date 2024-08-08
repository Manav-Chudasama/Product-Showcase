import React, { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import PropTypes from "prop-types";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
export default function AddReviewModal({
  product,
  productType,
  openModal,
  setOpenModal,
}) {
  const { user } = useUser();
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  if (!openModal) {
    return null;
  }

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log("nice");
      const response = await axios.post(
        "http://localhost:4000/api/review/create-review",
        {
          userId: user.id,
          username: user?.username ?? user.fullName,
          productId: product._id,
          rating,
          reviewDescription: description,
          productType: productType == "Fresh Product" ? "fresh" : "thrift",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }

    // Optionally close the modal
    handleClose();
  };
  return (
    <div className="w-96 z-50">
      <div
        id="review-modal"
        tabIndex={-1}
        aria-hidden="true"
        className={`fixed inset-0 z-50 ${
          openModal ? `block` : `hidden`
        } bg-black bg-opacity-50 h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden md:inset-0 antialiased`}
      >
        <div className="relative max-h-full w-full max-w-2xl p-4 mx-auto">
          {/* Modal content */}
          <div className="relative rounded-lg bg-white shadow">
            {/* Modal header */}
            <div className="flex items-center justify-between rounded-t border-b border-gray-200 p-4 md:p-5">
              <div>
                <h3 className="mb-1 text-lg font-semibold text-gray-900">
                  Add a review for:
                </h3>
                <a
                  href="#"
                  className="font-medium text-primary-700 hover:underline"
                >
                  {product.title}
                </a>
              </div>
              <button
                type="button"
                className="absolute right-5 top-5 ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-toggle="review-modal"
                onClick={handleClose}
              >
                <svg
                  className="h-3 w-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            {/* Modal body */}
            <form className="p-4 md:p-5" onSubmit={handleSubmit}>
              <div className="mb-4 grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar
                        key={star}
                        color={star <= rating ? "#FACA15" : "#E5E7EB"}
                        onClick={() => setRating(star)}
                        className="cursor-pointer"
                      />
                    ))}
                    <span className="ms-2 text-lg font-bold text-gray-900">
                      {rating} out of 5
                    </span>
                  </div>
                </div>
                {/* <div className="col-span-2">
                  <label
                    htmlFor="title"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Review title
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600"
                    required=""
                  />
                </div> */}
                <div className="col-span-2">
                  <label
                    htmlFor="description"
                    className="mb-2 block text-sm font-medium text-gray-900"
                  >
                    Review
                  </label>
                  <textarea
                    id="description"
                    rows={6}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="mb-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500"
                    required
                    placeholder="Write Your Review Here....."
                  />
                  <p className="ms-auto text-xs text-gray-500 dark:text-gray-400">
                    Problems with the product or delivery?{" "}
                    <Link to="/" className="text-blue-600 hover:underline">
                      Contact Us
                    </Link>
                    .
                  </p>
                </div>
                <div className="col-span-2">
                  <div className="flex items-center">
                    <input
                      id="review-checkbox"
                      type="checkbox"
                      defaultValue=""
                      className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
                      required
                    />
                    <label
                      htmlFor="review-checkbox"
                      className="ms-2 text-sm font-medium text-gray-500 dark:text-gray-400"
                    >
                      By publishing this review you agree with the{" "}
                      <a
                        href="#"
                        className="text-primary-600 hover:underline dark:text-primary-500"
                      >
                        terms and conditions
                      </a>
                      .
                    </label>
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-200 pt-4 dark:border-gray-700 md:pt-5">
                <button
                  type="submit"
                  className="me-2 inline-flex text-white bg-blue-700 hover:bg-primary-800 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 items-center justify-center hover:shadow-[0_4px_8px_0_rgba(0,0,0,0.2)]"
                >
                  Add review
                </button>
                <button
                  type="button"
                  data-modal-toggle="review-modal"
                  className="me-2 px-5 py-2.5 text-sm font-medium text-white hover:outline-none bg-black rounded-lg border border-gray-200 focus:z-10 hover:ring-2 hover:ring-gray-100 hover:shadow-[0_2px_4px_0_rgba(0,0,0,0.2)]"
                  onClick={handleClose}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

AddReviewModal.propTypes = {
  product: PropTypes.object.isRequired,
  productType: PropTypes.string.isRequired,
  openModal: PropTypes.bool.isRequired,
  setOpenModal: PropTypes.func.isRequired,
};
