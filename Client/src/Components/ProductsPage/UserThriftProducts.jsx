import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";
import { Fade } from "react-awesome-reveal";

export default function UserThriftProducts() {
  const { user } = useUser();
  const [products, setProducts] = useState([]);

  const fetchUserProducts = async () => {
    try {
      const userId = user.id;
      // console.log(user.id);
      const response = await axios.get(
        `http://localhost:4000/api/thrift-products/${userId}`
      );
      console.log(response.data);
      setProducts(response.data.thriftProducts);
      // console.log("products:", products[2].images[0]);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserProducts();
    }
  }, [user]);

  return (
    <Fade delay={200}>
      <section className="bg-gray-50 py-4 antialiased md:py-6">
        <div className="flex mb-4 max-w-full space-y-3">
          <div className="w-[90%] flex items-center relative left-[1%] lg:left-[7%] gap-5"></div>
        </div>
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <div className="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
            {products &&
              products.map((product, index) => (
                <ProductCard
                  key={index}
                  product={product}
                  productType="Thrift Product"
                  userThriftProduct={true}
                />
              ))}
          </div>
        </div>
      </section>
    </Fade>
  );
}
