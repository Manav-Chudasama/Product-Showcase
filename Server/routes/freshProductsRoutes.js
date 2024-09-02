import express from "express";
import multer from "multer";
import fs from "fs";

import { CreateFileUploadHelper } from "../middleware/FileUploadHelper.js";

import {
  getAllFreshProducts,
  createFreshProduct,
  updateFreshProduct,
  deleteFreshProduct,
} from "../controllers/freshProductController.js";

const router = express.Router();

// read all the fresh products
router.get("/", getAllFreshProducts);

// create a new product
router.post("/create-freshProduct", CreateFileUploadHelper, createFreshProduct);

//update a product
router.put("/update-freshProduct", updateFreshProduct);

// delete a product
router.delete("/delete-freshProduct", deleteFreshProduct);

export default router;
