import axios from "axios";

export const getAllFreshProducts = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_API_URL}/api/fresh-products/`
    );
    // console.log(response.data.data);

    // const shuffledProducts = shuffleArray(response.data.data);
    // setProducts(shuffledProducts);
    // console.log("products:", products[2].images[0]);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

export const getAllthriftProducts = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_API_URL}/api/thrift-products/`
    );
    // console.log(response.data.thriftProducts);
    // setProducts(response.data.thriftProducts);
    // console.log("products:", products[2].images[0]);

    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};
