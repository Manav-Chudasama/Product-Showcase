import axios from "axios";

export const getAllFreshProducts = async () => {
  try {
    const response = await axios.get(
      "http://localhost:4000/api/fresh-products/"
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
      "http://localhost:4000/api/thrift-products/"
    );
    // console.log(response.data.thriftProducts);
    // setProducts(response.data.thriftProducts);
    // console.log("products:", products[2].images[0]);

    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};
