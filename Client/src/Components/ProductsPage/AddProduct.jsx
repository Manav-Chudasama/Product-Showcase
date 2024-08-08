import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";
import { Fade } from "react-awesome-reveal";
export default function AddProduct() {
  const { user } = useUser();
  const [productData, setProductData] = useState({
    title: "",
    description: "",
    category: "",
    price: 0,
    images: [],
  });
  const [file, setFile] = useState([]);
  const reader = new FileReader();
  const fileInputRef = useRef(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    console.log("Selected files:", files);

    // If the new upload exceeds 3, reset to only the new files
    if (files.length > 3 || productData.images.length + files.length > 3) {
      alert(
        "You can only upload a maximum of 3 images. First 3 will be Selected."
      );
      const newPreviewUrls = files
        .slice(0, 3)
        .map((file) => URL.createObjectURL(file));

      // setProductData((prevProductData) => ({
      //   ...prevProductData,
      //   images: files.slice(0, 3),
      // }));

      setProductData({
        images: files.slice(0, 3),
      });

      setFile(newPreviewUrls);

      // Reset the file input to clear any extra files
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
        console.log("nice");
      }
      return;
    }

    const previewUrls = files.map((file) => URL.createObjectURL(file));
    // Update productData state with new images array
    setProductData((prevProductData) => ({
      ...prevProductData,
      images: [...prevProductData.images, ...files],
    }));
    setFile((prevFiles) => [...prevFiles, ...previewUrls]);

    // Logging after setting state will still show the previous state's value
    // Use useEffect or log inside a callback to see updated state immediately
  };

  useEffect(() => {
    console.log("Updated images:", productData.images);
  }, [productData.images]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const title = event.target[0].value;
    // const event.target[1].files
    const category = event.target[2].value;
    const price = event.target[3].value;
    const description = event.target[4].value;

    console.log(title, category, price, description, productData.images);
    console.log(
      "noice",
      productData.title,
      productData.category,
      productData.price,
      productData.description
    );

    // if (
    //   !productData.title ||
    //   !productData.description ||
    //   !productData.category ||
    //   !productData.price ||
    //   !productData.images
    // ) {
    //   alert("please fill in all the required fields");
    //   return;
    // }

    try {
      const formData = new FormData();

      formData.append("userId", user.id);
      formData.append("username", user?.username ?? user.fullName);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("price", price);
      productData.images.forEach((image) => {
        formData.append("images", image);
      });

      await axios
        .post(
          "http://localhost:4000/api/thrift-products/create-thriftProduct",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((response) => {
          console.log("Product created successfully:", response.data.success);
          if (response.data.success) {
            setProductData({
              title: "",
              description: "",
              category: "",
              price: 0,
              images: [],
            });
            setFile([]);
          }
        })
        .catch((err) => {
          console.log(err);
        });

      // console.log("Product created successfully:", response.data);
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <Fade>
      <section className="bg-white">
        <div className="py-2 px-4 mx-auto max-w-7xl lg:py-8">
          <h2 className="mb-4 text-3xl text-center font-bold text-gray-900">
            Add a new product
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div className="sm:col-span-2">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Product Name
                </label>
                <input
                  type="text"
                  name="title"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Type product name"
                  required={true}
                  value={productData.title}
                  onChange={handleInputChange}
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="images"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Upload Pictures! (First Selected Picture will be used as an
                  Overview image. max upload is 3 pictures.)
                </label>
                <input
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  name="images"
                  id="images"
                  className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full"
                  // value={productData.images == [] ? }
                  required={true}
                  multiple={true}
                  onChange={handleFileChange}
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="brand"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Preview of Your Images:
                </label>
                <div className="flex w-full items-center justify-evenly">
                  {file.length > 0 &&
                    file.map((previewUrl, index) => (
                      <img
                        key={index}
                        src={previewUrl}
                        className="h-[4.7rem]"
                        alt={`Preview ${index}`}
                      />
                    ))}
                </div>
              </div>
              <div>
                <label
                  htmlFor="category"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                  value={productData.category}
                  onChange={handleInputChange}
                >
                  <option>Select category</option>
                  <option defaultChecked={true} value="Clothing">
                    Clothing
                  </option>
                  <option value="Electronics">Electronics</option>
                  <option value="Footwear">Footwear</option>
                  <option value="Books">Books</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="item-weight"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="$2999"
                  value={productData.price}
                  onChange={handleInputChange}
                  required={true}
                />
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={8}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Your description here"
                  value={productData.description}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <button
              type="submit"
              className="flex mx-auto items-center mt-4 sm:mt-6 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 shadow-lg shadow-blue-500/50  font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2"
            >
              Add product
            </button>
          </form>
        </div>
      </section>
    </Fade>
  );
}
