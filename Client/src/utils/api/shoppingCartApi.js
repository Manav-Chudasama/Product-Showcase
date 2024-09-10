import axios from "axios";

export const addToShoppingCart = async (userId, productId, productType) => {
  try {
    const response = await axios.post(
      `${
        import.meta.env.VITE_BACKEND_API_URL
      }/api/shopping-cart/add-to-shopping-cart`,
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

export const deleteFromShoppingCart = async (
  userId,
  productId,
  productType
) => {
  try {
    const response = await axios.post(
      `${
        import.meta.env.VITE_BACKEND_API_URL
      }/api/shopping-cart/delete-from-shopping-cart`,
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

export const setProductQuantity = async (
  userId,
  productId,
  productType,
  quantity
) => {
  try {
    const response = await axios.post(
      `${
        import.meta.env.VITE_BACKEND_API_URL
      }/api/shopping-cart/update-Product-quantity`,
      {
        userId,
        productId,
        productType: productType == "Fresh Product" ? "fresh" : "thrift",
        quantity,
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
