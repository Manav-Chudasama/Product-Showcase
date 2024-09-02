import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";

import ThriftProductsModel from "../models/thriftProductsModel.js";
// fresh products images uploads path
// Dynamic storage configuration
export const CreateFileUploadHelper = async (req, res, next) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      console.log("entry");
      console.log("file: ", file);
      console.log("req: ", req.body);
      const productTitle = req.body.title;
      const dir = req.path.includes("create-freshProduct")
        ? `uploads/freshProducts/${productTitle}`
        : `uploads/thriftProducts/${productTitle}`;
      if (dir && !fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      cb(null, dir);
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
  const upload = multer({ storage }).array("images", 3);
  // Use Multer to handle the file upload, then call next()
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
    next();
  });
};

export const UpdateProductImagesHelper = async (req, res, next) => {
  console.log(req.body);

  const storage = multer.diskStorage({
    destination: async function (req, file, cb) {
      const productTitle = req.body.title;
      const productId = req.body.productId;
      console.log(req.body);

      const product = await ThriftProductsModel.findById(productId);

      if (!product) {
        return res
          .status(404)
          .json({ success: false, message: "Product not found" });
      }

      const dir = `uploads/thriftProducts/${productTitle}`;
      let fileCount;
      // Check if the directory exists
      if (fs.existsSync(dir)) {
        // Delete all existing images in the directory
        fs.readdir(dir, async (err, files) => {
          if (err) {
            console.log("Error reading directory:", err);
            return res.status(500).json({
              success: false,
              message: "Error while updating product images.",
            });
          }

          fileCount = files;

          // Use async/await for unlink
          for (const file of files) {
            const filePath = path.join(dir, file);
            console.log("path: ", filePath);
            if (fs.existsSync(filePath)) {
              try {
                await fs.promises.unlink(filePath);
                console.log(`Deleted file: ${filePath}`);
              } catch (err) {
                console.log(`Error deleting file: ${filePath}`, err);
                return res.status(500).json({
                  success: false,
                  message: "Error while updating product images.",
                });
              }
            } else {
              console.log(`File not found: ${filePath}`);
            }
          }
        });
      } else {
        // If the directory does not exist, create it
        console.log(productId);
        console.log("product", product);
        // fs.mkdirSync(dir, { recursive: true });
      }

      fileCount.length != 0 ? cb(null, dir) : "";
    },
    filename: function (req, file, cb) {
      // cb(null, file.originalname);
    },
  });

  const upload = multer({ storage }).array("images", 3);

  // Use Multer to handle the file upload, then call next()
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
    next();
  });
};
