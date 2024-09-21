import mongoose from "mongoose";
import ThriftproductModel from "../models/thriftProductsModel.js";

// fetch all the thrift products
export const getAllThriftProducts = async (req, res) => {
  try {
    const thriftProducts = await ThriftproductModel.find(); // Fetch all freshProducts from the database
    res.status(200).json({
      success: true,
      thriftProducts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching users",
      error: error.message,
    });
  }
};

// fetch single user's thrift products
export const userThriftProducts = async (req, res) => {
  try {
    console.log("nice");
    console.log(req.params);
    const thriftProducts = await ThriftproductModel.find({
      userId: req.params.userId,
    });
    res.status(200).json({
      success: true,
      thriftProducts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching users",
      error: error.message,
    });
  }
};

// create a new thrift product
export const createThriftProduct = async (req, res) => {
  try {
    // console.log("image:", req.body);
    // console.log("files:", req.files);

    const { userId, username, title, description, category, price, images } =
      req.body;

    if (
      !userId ||
      !username ||
      !title ||
      !description ||
      !category ||
      !price ||
      !images
    ) {
      res
        .status(500)
        .json({ success: false, message: "Please fill all the fields" });
    }

    const imageFiles = images.split(",");
    console.log(typeof imageFiles);

    const newProduct = new ThriftproductModel({
      userId,
      username,
      title,
      description,
      category,
      images: imageFiles,
      price,
      reviews: [],
    });

    // Save the product to the database
    await newProduct.save();

    // console.log("Product saved successfully!");
    res.status(200).send({
      success: true,
      message: "Product created successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// update a thrift product
export const updateThriftProduct = async (req, res) => {
  console.log("enter: ", req.body);

  try {
    // const { productId } = req.params;
    const { userId, username, productId, title, description, category, price } =
      req.body;
    const updatedFields = { title, description, category, price };

    // If new images were uploaded, add the paths to the update fields
    if (req.files && req.files.length > 0) {
      const imagePaths = req.files.map(
        (file) => file.destination + `/${file.originalname}`
      );

      if (req.files) {
        updatedFields.images = imagePaths;
      }
    }

    if (req.body.images) {
      console.log(req.body.images);
    }

    ThriftproductModel.findByIdAndUpdate();
    let id = mongoose.Types.ObjectId.createFromHexString(productId);
    console.log(id, productId);

    const updatedProduct = await ThriftproductModel.findByIdAndUpdate(
      productId,
      updatedFields
    );

    if (!updatedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully!",
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while updating the product",
    });
  }
};

// delete a thrift product
export const deleteThriftProduct = async (req, res) => {};
