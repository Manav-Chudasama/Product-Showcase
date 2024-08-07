import mongoose from "mongoose";
import FreshproductModel from "../models/freshProductsModel.js";

// fetch all the fresh products
export const getAllFreshProducts = async (req, res) => {
  try {
    const freshProducts = await FreshproductModel.find(); // Fetch all freshProducts from the database
    res.status(200).json({
      success: true,
      freshProducts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching users",
      error: error.message,
    });
  }
};

// create a new fresh product
export const createFreshProduct = async (req, res) => {
  try {
    console.log("image:", req.body);
    console.log("files:", req.files);

    const { title, description, category, price } = req.body;

    if (!title || !description || !category || !price || !req.files) {
      res
        .status(500)
        .json({ success: false, message: "Please fill all the fields" });
    }

    const imageFiles = req.files;
    const imagePaths = imageFiles.map(
      (file) => file.destination + `/${file.originalname}`
    );
    console.log(imagePaths);

    const newProduct = new FreshproductModel({
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

// update a fresh product
export const updateFreshProduct = async (req, res) => {};

// delete a fresh product
export const deleteFreshProduct = async (req, res) => {};
