import axios from "axios";

export const loadScript = async (src) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;

    script.onload = () => {
      resolve(true);
    };

    script.onerror = () => {
      resolve(false);
    };

    document.body.appendChild(script);
  });
};

export const createRazorpayOrder = async (amount) => {
  try {
    const response = await axios.post(
      "http://localhost:4000/api/payment/orderId",
      {
        amount: amount * 100,
        currency: "INR",
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const handleRazorpayScreen = async (amount) => {
  try {
    let payment_id;
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      console.log("Error loading checkout.js");
      alert("error loading checkout.js");
      return;
    }

    const options = {
      key: import.meta.env.VITE_TEST_KEY,
      amount: amount,
      currency: "INR",
      name: "Product Showcase",
      description: "Payment to Product Showcase",
      handler: (result) => {
        payment_id = result.razorpay_peyment_id;
      },
      prefill: {
        name: "Product Showcase",
        email: "heysens1969@gmail.com",
      },
      theme: {
        color: "red",
      },
    };

    const paymentObject = new window.Razorpay(options);

    return { paymentObject, payment_id };
    //paymentObject.open();
  } catch (error) {
    console.log(error);
  }
};

export const paymentfetch = async (paymentId) => {
  try {
    const response = await axios.get(
      `http://localhost:4000/api/payment/${paymentId}`
    );

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getAllProductOrders = async (userId) => {
  try {
    const response = await axios.get(
      `http://localhost:4000/api/productOrder/getAllProductOrders/${userId}`
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
