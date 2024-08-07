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
    console.log("image:", req.body);
    console.log("files:", req.files);

    const { userId, username, title, description, category, price } = req.body;

    if (
      !userId ||
      !username ||
      !title ||
      !description ||
      !category ||
      !price ||
      !req.files
    ) {
      res
        .status(500)
        .json({ success: false, message: "Please fill all the fields" });
    }

    const imageFiles = req.files;
    const imagePaths = imageFiles.map(
      (file) => file.destination + `/${file.originalname}`
    );
    console.log(imagePaths);

    const newProduct = new ThriftproductModel({
      userId,
      username,
      title,
      description,
      category,
      images: imagePaths,
      price,
      reviews: [],
    });

    // Save the product to the database
    await newProduct
      .save()
      .then(() => {
        console.log("Product saved successfully!");
        res.status(200).send({
          success: true,
          message: "Product created successfully!",
        });
      })
      .catch((error) => {
        console.error("Error saving product:", error);
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
export const updateThriftProduct = async (req, res) => {};

// delete a thrift product
export const deleteThriftProduct = async (req, res) => {};
