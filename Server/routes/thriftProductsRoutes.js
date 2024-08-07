import express from "express";
import multer from "multer";
import fs from "fs";

import { FileUploadHelper } from "../middleware/FileUploadHelper.js";
import {
  getAllThriftProducts,
  userThriftProducts,
  createThriftProduct,
  updateThriftProduct,
  deleteThriftProduct,
} from "../controllers/thriftProductController.js";

const router = express.Router();

// read all the fresh products
router.get("/", getAllThriftProducts);

// read single user's thrift products
router.get("/:userId", userThriftProducts);

// create a thrift product
router.post("/create-thriftProduct", FileUploadHelper, createThriftProduct);

//update a product
router.put("/update-thriftProduct", updateThriftProduct);

// delete a product
router.delete("/delete-thriftProduct", deleteThriftProduct);

export default router;
