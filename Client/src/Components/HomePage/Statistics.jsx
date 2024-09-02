import axios from "axios";
import React, { useEffect, useState } from "react";
import { Zoom } from "react-awesome-reveal";

export default function Statistics() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalFreshProducts, setTotalFreshproducts] = useState(0);
  const [totalUploadedProducts, setTotalUploadedProducts] = useState(0);

  const fetchusers = async () => {
    try {
      const reponse = await axios.get(
        "http://localhost:4000/api/user/getAllUsers"
      );
      console.log("users: ", reponse.data.data);
      setTotalUsers(reponse.data.data.length);
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchFreshProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/fresh-products/"
      );
      // console.log(response.data.freshProducts);
      setTotalFreshproducts(response.data.freshProducts.length);
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchUploadedProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/thrift-products/"
      );
      setTotalUploadedProducts(response.data.thriftProducts.length);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchusers();
    fetchFreshProducts();
    fetchUploadedProducts();
  }, [totalUsers, totalFreshProducts]);
  return (
    <div>
      <section className="body-font bg-gray-100">
        <Zoom>
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-wrap -m-4 text-center">
              <div className="p-4 sm:w-1/4 w-1/2">
                <h2 className="title-font font-medium sm:text-4xl text-3xl text-gray-900">
                  {totalUsers}
                </h2>
                <p className="leading-relaxed">Users</p>
              </div>
              <div className="p-4 sm:w-1/4 w-1/2">
                <h2 className="title-font font-medium sm:text-4xl text-3xl text-gray-900">
                  {totalFreshProducts}
                </h2>
                <p className="leading-relaxed">Fresh Products</p>
              </div>
              <div className="p-4 sm:w-1/4 w-1/2">
                <h2 className="title-font font-medium sm:text-4xl text-3xl text-gray-900">
                  {totalUploadedProducts}
                </h2>
                <p className="leading-relaxed">Products Uploaded</p>
              </div>
              <div className="p-4 sm:w-1/4 w-1/2">
                <h2 className="title-font font-medium sm:text-4xl text-3xl text-gray-900">
                  4
                </h2>
                <p className="leading-relaxed">Products Purchased</p>
              </div>
            </div>
          </div>
        </Zoom>
      </section>
    </div>
  );
}
