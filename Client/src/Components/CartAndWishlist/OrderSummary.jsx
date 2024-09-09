import React, { useState } from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";

const OrderSummaryCard = ({ product }) => {
  return (
    <>
      <td className="whitespace-nowrap py-4 md:w-[384px]">
        <div className="flex items-center gap-4">
          {/* <a
            href="#"
            className="flex items-center aspect-square w-10 h-10 shrink-0"
          >
            <img
              className="h-auto w-full max-h-full"
              src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg"
              alt="imac image"
            />
          </a> */}
          <span className="hover:underline text-wrap">
            {product.productTitle}
          </span>
        </div>
      </td>
      <td className="p-4 text-base font-normal text-gray-900">
        x{product.quantity}
      </td>
      <td className="p-4 text-right text-base font-bold text-gray-900">
        ₹{product.price}
      </td>
    </>
  );
};

export default function OrderSummary() {
  const location = useLocation();
  const { order } = location.state;
  const products = order.products;
  console.log(order);

  return (
    <div>
      <section className="bg-white py-8 antialiased md:py-16">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">
              Billing Information
            </h2>
            <div className="mt-6 space-y-4 border-b border-t border-gray-200 py-8 sm:mt-8">
              <h4 className="text-lg font-semibold text-gray-900">
                {/* Billing Information */}
                {order.username}
              </h4>
              <dl>
                <dt className="text-base font-medium text-gray-900"></dt>
                <dd className="mt-1 text-base font-normal text-gray-500">
                  {`${order.email}, tel: ${order.phone}`}
                </dd>
              </dl>
            </div>
            <div className="mt-6 sm:mt-8">
              <div className="relative overflow-x-auto border-b border-gray-200">
                <table className="w-full text-left font-medium text-gray-900 md:table-fixed">
                  <tbody className="divide-y divide-gray-200">
                    {products.map((product, index) => (
                      <tr key={index}>
                        <OrderSummaryCard product={product} />
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 space-y-6">
                <h4 className="text-xl font-semibold text-gray-900">
                  Order Summary
                </h4>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-gray-500">SubTotal</dt>
                      <dd className="text-base font-medium text-gray-900">
                        ₹{order.subTotal}
                      </dd>
                    </dl>
                    {/* <dl className="flex items-center justify-between gap-4">
                      <dt className="text-gray-500">Savings</dt>
                      <dd className="text-base font-medium text-green-500">
                        -$299.00
                      </dd>
                    </dl> */}
                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-gray-500">Shipping</dt>
                      <dd className="text-base font-medium text-gray-900">
                        ₹{order.shippingCost}
                      </dd>
                    </dl>
                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-gray-500">Tax</dt>
                      <dd className="text-base font-medium text-gray-900">
                        ₹{order.taxRate}
                      </dd>
                    </dl>
                  </div>
                  <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2">
                    <dt className="text-lg font-bold text-gray-900">Total</dt>
                    <dd className="text-lg font-bold text-gray-900">
                      ₹{order.totalAmount}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

OrderSummaryCard.propTypes = {
  product: PropTypes.arrayOf(PropTypes.object).isRequired,
};
