import axios from "axios";

export const addToWishlist = async (userId, productId, productType) => {
  try {
    const response = await axios.post(
      "http://localhost:4000/api/wishlist/add-to-wishlist",
      {
        userId,
        productId,
        productType: productType == "Fresh Product" ? "fresh" : "thrift",
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const deleteFromWishlist = async (userId, productId, productType) => {
  try {
    const response = await axios.post(
      "http://localhost:4000/api/wishlist/delete-from-wishlist",
      {
        userId,
        productId,
        productType: productType == "Fresh Product" ? "fresh" : "thrift",
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response;
  } catch (error) {
    console.log(error);
  }
};
