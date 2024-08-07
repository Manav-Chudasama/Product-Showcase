import express from "express";
import multer from "multer";
import fs from "fs";

// fresh products images uploads path
// Dynamic storage configuration
export const FileUploadHelper = async (req, res, next) => {
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
