import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";
import PropTypes from "prop-types";
import { addToShoppingCart } from "../../utils/api/shoppingCartApi";
import { deleteFromWishlist } from "../../utils/api/wishlistApi";
const WishlistCard = ({
  product,
  // productTitle,
  // productImg,
  // productPrice,
  // ProductCategory,
}) => {
  const { user } = useUser();

  const handleShoppingCart = async () => {
    try {
      const productType = !product.productId.username
        ? "Fresh Product"
        : "Thrift Product";
      // console.log(productType);
      const response = await addToShoppingCart(
        user.id,
        product.productId._id,
        productType
      );
      if (response.data.success) {
        const result = await deleteFromWishlist(
          user.id,
          product.productId._id,
          productType
        );
        console.log(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteFromWishlist = async () => {
    try {
      const productType = !product.productId.username
        ? "Fresh Product"
        : "Thrift Product";
      const response = await deleteFromWishlist(
        user.id,
        product.productId._id,
        productType
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <li className="flex flex-col py-6 sm:flex-row sm:justify-between ">
      <div className="flex w-full space-x-2 sm:space-x-4">
        <img
          className="flex-shrink-0 object-cover w-20 h-20 dark:border- rounded outline-none sm:w-32 sm:h-32 bg-gray-500"
          src={`http://localhost:4000/${product.productId.images[0]}`}
          alt={product.productId.title}
        />
        <div className="flex flex-col justify-between w-full pb-4">
          <div className="flex justify-between w-full pb-2 space-x-2">
            <div className="space-y-1">
              <h3 className="text-lg font-semibold leading-snug sm:pr-8">
                {product.productId.title}
              </h3>
              <p className="text-sm text-gray-400">
                {product.productId.category}
              </p>
            </div>
            <div className="text-right">
              <p className="text-lg font-semibold">{product.productId.price}</p>
              {/* <p className="text-sm line-through text-gray-600">75.50€</p> */}
            </div>
          </div>
          <div className="flex text-sm divide-x">
            <button
              type="button"
              className="flex items-center px-2 py-1 pl-0 space-x-1 text-red-600"
              onClick={handleDeleteFromWishlist}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="w-4 h-4 fill-current"
              >
                <path d="M96,472a23.82,23.82,0,0,0,23.579,24H392.421A23.82,23.82,0,0,0,416,472V152H96Zm32-288H384V464H128Z"></path>
                <rect width="32" height="200" x="168" y="216"></rect>
                <rect width="32" height="200" x="240" y="216"></rect>
                <rect width="32" height="200" x="312" y="216"></rect>
                <path d="M328,88V40c0-13.458-9.488-24-21.6-24H205.6C193.488,16,184,26.542,184,40V88H64v32H448V88ZM216,48h80V88H216Z"></path>
              </svg>
              <span>Remove</span>
            </button>
            <button
              type="button"
              className="flex items-center px-2 py-1 space-x-1 text-blue-600"
              onClick={handleShoppingCart}
            >
              <svg
                className="w-5 h-5"
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
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default function Wishlist() {
  const [wishlist, setWishlist] = useState({
    freshProducts: [],
    thriftProducts: [],
  });
  const { user, isLoaded } = useUser();

  const fetchWishlist = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/wishlist/get-wishlist/${user.id}`
      );
      if (response.data.success) {
        console.log(response.data);
        setWishlist(response.data.wishlist);
      }
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  };

  useEffect(() => {
    if (isLoaded && user) {
      fetchWishlist();
    }
  }, [isLoaded, user]);
  return (
    <div>
      <div className="flex flex-col min-h-dvh max-w-full m-2 p-6 space-y-4 sm:p-10">
        <h1 className="text-3xl font-bold text-gray-800 text-center">
          Your Wishlist
        </h1>
        <ul className="flex flex-col divide-y divide-gray-700">
          {wishlist &&
            wishlist.freshProducts.map((product, index) => (
              <WishlistCard key={index} product={product} />
            ))}
          {wishlist &&
            wishlist.thriftProducts.map((product, index) => (
              <WishlistCard key={index} product={product} />
            ))}
        </ul>
      </div>
    </div>
  );
}

WishlistCard.propTypes = {
  product: PropTypes.object.isRequired,
  // productTitle: PropTypes.string.isRequired,
  // ProductCategory: PropTypes.string.isRequired,
  // productImg: PropTypes.string.isRequired,
  // productPrice: PropTypes.number.isRequired,
};
