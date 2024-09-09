import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import PropTypes from "prop-types";
import { IoMdCheckmark } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { getAllProductOrders } from "../../utils/api/paymentApi";
import { useUser } from "@clerk/clerk-react";
import { Fade } from "react-awesome-reveal";

const OrderOverviewCard = ({ order }) => {
  const navigate = useNavigate();
  const handleOrderSummary = () => {
    navigate(`/order-summary/${order.orderId}`, {
      state: { order },
    });
  };
  return (
    <div className="flex flex-wrap items-center gap-y-4 py-6">
      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
        <dt className="text-base font-medium text-gray-500">Order ID:</dt>
        <dd className="mt-1.5 text-sm font-semibold text-gray-900">
          <a href="#" className="hover:underline">
            {order.orderId}
          </a>
        </dd>
      </dl>
      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
        <dt className="text-base font-medium text-gray-500">Date:</dt>
        <dd className="mt-1.5 text-sm font-semibold text-gray-900">
          {format(new Date(order.timestamp).toLocaleDateString(), "dd-MM-yyyy")}
        </dd>
      </dl>
      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
        <dt className="text-base font-medium text-gray-500">Price:</dt>
        <dd className="mt-1.5 text-sm font-semibold text-gray-900">
          ₹{order.totalAmount}
        </dd>
      </dl>
      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
        <dt className="text-base font-medium text-gray-500">Status:</dt>
        <dd className="me-2 mt-1.5 inline-flex items-center rounded bg-green-100 px-2.5 py-0.5 text-sm font-medium text-green-800">
          <IoMdCheckmark className="mr-1" />
          Verified
        </dd>
      </dl>
      <div className="w-full flex lg:w-64 items-center justify-center gap-4">
        <button
          onClick={handleOrderSummary}
          className="w-full inline-flex justify-center rounded-lg  border border-white bg-black px-3 py-2 text-sm font-medium text-white hover:bg-gray-800 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 lg:w-auto"
        >
          View details
        </button>
      </div>
    </div>
  );
};

export default function OrderOverview() {
  const { user } = useUser();
  const [orders, setOrders] = useState([]);

  const getOrders = async (userId) => {
    const response = await getAllProductOrders(userId);
    console.log(response.orders);
    setOrders(response.orders);
  };

  useEffect(() => {
    if (user) {
      getOrders(user.id);
    }
  }, [user]);
  return (
    <Fade delay={200}>
      <section className="bg-white py-8 antialiased md:py-16">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <div className="mx-auto max-w-5xl">
            <div className="gap-4 sm:flex sm:items-center sm:justify-between">
              <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">
                My orders
              </h2>
            </div>
            <div className="mt-6 flow-root sm:mt-8">
              <div className="divide-y divide-gray-200 min-h-96">
                {orders.length == 0 && <div>Start Shopping now!</div>}
                {orders
                  .map((order, index) => (
                    <div key={index}>
                      <OrderOverviewCard order={order} />
                    </div>
                  ))
                  .reverse()}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fade>
  );
}

OrderOverviewCard.propTypes = {
  order: PropTypes.arrayOf(PropTypes.object).isRequired,
};
