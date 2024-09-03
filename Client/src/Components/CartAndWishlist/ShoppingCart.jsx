import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";

import { TiMinus, TiPlus } from "react-icons/ti";
import {
  deleteFromShoppingCart,
  setProductQuantity,
} from "../../utils/api/shoppingCartApi";
import { Fade } from "react-awesome-reveal";
import AlertBox from "../../utils/parts/AlertBox";

const ShoppingCard = ({ product, onRemove, onAlert, onUpdateQuantity }) => {
  console.log(product.productId.quantity);

  const { user } = useUser();
  const [quantity, setQuantity] = useState(product.productId.quantity);
  const [productTotalPrice, setProductTotalPrice] = useState(
    product.productId.price
  );

  const handleQuantityChange = async (newQuantity) => {
    const productType = !product.productId.username
      ? "Fresh Product"
      : "Thrift Product";
    if (newQuantity < 1) return; // Prevent negative quantity
    setQuantity(newQuantity);
    setProductTotalPrice(newQuantity * product.productId.price);

    onUpdateQuantity(product.productId._id, newQuantity);
    const response = await setProductQuantity(
      product.productId._id,
      productType,
      newQuantity
    );

    if (response.data.success) {
      console.log(response.data.message);
    }
  };

  const handleDelteFromShoppingCart = async () => {
    try {
      const productType = !product.productId.username
        ? "Fresh Product"
        : "Thrift Product";
      const response = await deleteFromShoppingCart(
        user.id,
        product.productId._id,
        productType
      );
      console.log(response.data);
      if (response.data.success) {
        onRemove(product.productId._id, productType);
        onAlert("Product removed from shopping Cart!", "error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleQuantityChange(
      isNaN(product.productId.quantity) ? 1 : product.productId.quantity
    );
  }, []);

  return (
    <>
      <div className="grid grid-cols-3 items-start gap-4">
        <div className="col-span-2 flex items-start gap-4">
          <div className="w-28 h-28 max-sm:w-24 max-sm:h-24 shrink-0 bg-gray-100 p-2 rounded-md">
            <img
              src={`http://localhost:4000/${product.productId.images[0]}`}
              className="w-full h-full object-contain"
              alt={product.productId.title}
            />
          </div>
          <div className="flex flex-col">
            <h3 className="text-base font-bold text-gray-800">
              {product.productId.title}
            </h3>
            <p className="text-xs font-semibold text-gray-500 mt-0.5">
              {product.productId.category}
            </p>
            <button
              type="button"
              className="mt-6 font-semibold text-red-500 text-xs flex items-center gap-1 shrink-0"
              onClick={handleDelteFromShoppingCart}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 fill-current inline"
                viewBox="0 0 24 24"
              >
                <path
                  d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"
                  data-original="#000000"
                />
                <path
                  d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"
                  data-original="#000000"
                />
              </svg>
              Remove
            </button>
          </div>
        </div>
        <div className="ml-auto">
          <h4 className="text-lg max-sm:text-base font-bold text-gray-800">
            ₹{productTotalPrice}
          </h4>
          <div className="mt-6 flex items-center px-3 py-1.5 border border-gray-300 text-gray-800 text-xs outline-none bg-transparent rounded-md">
            <button onClick={(e) => handleQuantityChange(quantity - 1)}>
              <TiMinus className="text-[1.5em] hover:text-red-600" />
            </button>
            <span className="mx-3 font-bold">{quantity}</span>
            <button onClick={(e) => handleQuantityChange(quantity + 1)}>
              <TiPlus className="text-[1.5em] hover:text-green-500" />
            </button>
          </div>
        </div>
      </div>
      <hr className="border-gray-300" />
    </>
  );
};

export default function ShoppingCart() {
  const [shoppingCart, setShoppingCart] = useState({
    freshProducts: [],
    thriftProducts: [],
  });
  const [alert, setAlert] = useState({ message: "", type: "" });
  const { user, isLoaded } = useUser();
  const [subtotal, setSubtotal] = useState(0);
  const shippingCost = 2.0;
  const taxRate = 0.02; // Assuming 2% tax rate

  const calculateSubtotal = (cart) => {
    let newSubtotal = 0;
    cart.freshProducts.forEach((product) => {
      newSubtotal += product.quantity * product.productId.price;
    });
    cart.thriftProducts.forEach((product) => {
      newSubtotal += product.quantity * product.productId.price;
    });
    return newSubtotal;
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    setShoppingCart((prevCart) => {
      const updatedFreshProducts = prevCart.freshProducts.map((product) =>
        product.productId._id === productId
          ? { ...product, quantity: newQuantity }
          : product
      );
      const updatedThriftProducts = prevCart.thriftProducts.map((product) =>
        product.productId._id === productId
          ? { ...product, quantity: newQuantity }
          : product
      );

      const updatedCart = {
        freshProducts: updatedFreshProducts,
        thriftProducts: updatedThriftProducts,
      };
      setSubtotal(calculateSubtotal(updatedCart));
      return updatedCart;
    });
  };

  const fetchShoppingCart = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/shopping-cart/get-shopping-cart/${user.id}`
      );
      if (response.data.success) {
        console.log(response.data);
        setShoppingCart(response.data.shoppingCart);
        console.log(shoppingCart.freshProducts);

        shoppingCart.freshProducts.forEach((product) => {
          console.log(product.productId.title);
        });
      }
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  };

  const handleRemoveProduct = (productId, productType) => {
    setShoppingCart((preShoppingCart) => {
      const updatedFreshProducts = preShoppingCart.freshProducts.filter(
        (product) => product.productId._id !== productId
      );
      const updatedThriftProducts = preShoppingCart.thriftProducts.filter(
        (product) => product.productId._id !== productId
      );

      return {
        freshProducts: updatedFreshProducts,
        thriftProducts: updatedThriftProducts,
      };
    });
  };

  const showAlert = (message, type) => {
    setAlert({ message, type });
    setTimeout(() => setAlert({ message: "", type: "" }), 3000);
  };

  useEffect(() => {
    if (isLoaded && user) {
      fetchShoppingCart();
    }
  }, [isLoaded, user]);

  const total = subtotal + shippingCost + subtotal * taxRate;
  return (
    <Fade
      delay={200}
      triggerOnce
      className="font-sans px-2 max-md:max-w-xl mx-auto bg-white py-4"
    >
      <h1 className="text-3xl font-bold text-gray-800 text-center">
        Shopping Cart
      </h1>
      <div className="grid md:grid-cols-3 gap-8 mt-16">
        <div className="md:col-span-2 space-y-4">
          {shoppingCart.freshProducts.length == 0 &&
            shoppingCart.thriftProducts.length == 0 && (
              <div className="text-2xl font-bold">
                Add Something to Your Shopping Cart...
              </div>
            )}
          {shoppingCart &&
            shoppingCart.freshProducts.map((product, index) => (
              <ShoppingCard
                key={index}
                product={product}
                onRemove={handleRemoveProduct}
                onAlert={showAlert}
                onUpdateQuantity={handleUpdateQuantity}
              />
            ))}
          {shoppingCart &&
            shoppingCart.thriftProducts.map((product, index) => (
              <ShoppingCard
                key={index}
                product={product}
                onRemove={handleRemoveProduct}
                onAlert={showAlert}
                onUpdateQuantity={handleUpdateQuantity}
              />
            ))}
          {alert.message && (
            <AlertBox
              message={alert.message}
              type={alert.type}
              onClose={() => setAlert({ message: "", type: "" })}
            />
          )}
        </div>
        <div className="bg-gray-100 p-4 h-max rounded-xl shadow-[0_4px_8px_0_rgba(0,0,0,0.2)] transition-all hover:shadow-[0_8px_14px_0_rgba(0,0,0,0.2)]">
          <h3 className="text-lg max-sm:text-base font-bold text-gray-800 border-b border-gray-300 pb-2">
            Order Summary
          </h3>
          <form className="mt-6">
            <div>
              <h3 className="text-base text-gray-800  font-semibold mb-4">
                Enter Details
              </h3>
              <div className="space-y-3">
                <div className="relative flex items-center">
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="px-4 py-2.5 bg-white text-gray-800 rounded-md w-full text-sm border-b focus:border-gray-800 outline-none"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#bbb"
                    stroke="#bbb"
                    className="w-4 h-4 absolute right-4"
                    viewBox="0 0 24 24"
                  >
                    <circle cx={10} cy={7} r={6} data-original="#000000" />
                    <path
                      d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                      data-original="#000000"
                    />
                  </svg>
                </div>
                <div className="relative flex items-center">
                  <input
                    type="email"
                    placeholder="Email"
                    className="px-4 py-2.5 bg-white text-gray-800 rounded-md w-full text-sm border-b focus:border-gray-800 outline-none"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#bbb"
                    stroke="#bbb"
                    className="w-4 h-4 absolute right-4"
                    viewBox="0 0 682.667 682.667"
                  >
                    <defs>
                      <clipPath id="a" clipPathUnits="userSpaceOnUse">
                        <path d="M0 512h512V0H0Z" data-original="#000000" />
                      </clipPath>
                    </defs>
                    <g
                      clipPath="url(#a)"
                      transform="matrix(1.33 0 0 -1.33 0 682.667)"
                    >
                      <path
                        fill="none"
                        strokeMiterlimit={10}
                        strokeWidth={40}
                        d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                        data-original="#000000"
                      />
                      <path
                        d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z"
                        data-original="#000000"
                      />
                    </g>
                  </svg>
                </div>
                <div className="relative flex items-center">
                  <input
                    type="number"
                    placeholder="Phone No."
                    className="px-4 py-2.5 bg-white text-gray-800 rounded-md w-full text-sm border-b focus:border-gray-800 outline-none"
                  />
                  <svg
                    fill="#bbb"
                    className="w-4 h-4 absolute right-4"
                    viewBox="0 0 64 64"
                  >
                    <path
                      d="m52.148 42.678-6.479-4.527a5 5 0 0 0-6.963 1.238l-1.504 2.156c-2.52-1.69-5.333-4.05-8.014-6.732-2.68-2.68-5.04-5.493-6.73-8.013l2.154-1.504a4.96 4.96 0 0 0 2.064-3.225 4.98 4.98 0 0 0-.826-3.739l-4.525-6.478C20.378 10.5 18.85 9.69 17.24 9.69a4.69 4.69 0 0 0-1.628.291 8.97 8.97 0 0 0-1.685.828l-.895.63a6.782 6.782 0 0 0-.63.563c-1.092 1.09-1.866 2.472-2.303 4.104-1.865 6.99 2.754 17.561 11.495 26.301 7.34 7.34 16.157 11.9 23.011 11.9 1.175 0 2.281-.136 3.29-.406 1.633-.436 3.014-1.21 4.105-2.302.199-.199.388-.407.591-.67l.63-.899a9.007 9.007 0 0 0 .798-1.64c.763-2.06-.007-4.41-1.871-5.713z"
                      data-original="#000000"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </form>
          <ul className="text-gray-800 mt-6 space-y-3">
            <li className="flex flex-wrap gap-4 text-sm">
              Subtotal{" "}
              <span className="ml-auto font-bold">₹{subtotal.toFixed(2)}</span>
            </li>
            <li className="flex flex-wrap gap-4 text-sm">
              Shipping{" "}
              <span className="ml-auto font-bold">
                ₹{shippingCost.toFixed(2)}
              </span>
            </li>
            <li className="flex flex-wrap gap-4 text-sm">
              Tax{" "}
              <span className="ml-auto font-bold">
                ₹{(subtotal * taxRate).toFixed(2)}
              </span>
            </li>
            <hr className="border-gray-300" />
            <li className="flex flex-wrap gap-4 text-sm font-bold">
              Total <span className="ml-auto">₹{total.toFixed(2)}</span>
            </li>
          </ul>
          <div className="mt-6 space-y-3">
            <button
              type="button"
              className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-gray-800 hover:bg-gray-900 text-white rounded-md"
            >
              Checkout
            </button>
            <button
              type="button"
              className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-blue-700 text-white border border-gray-300 rounded-md"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </Fade>
  );
}

ShoppingCard.propTypes = {
  product: PropTypes.object.isRequired,
  onRemove: PropTypes.func.isRequired,
  onAlert: PropTypes.func.isRequired,
  onUpdateQuantity: PropTypes.func.isRequired,
};
