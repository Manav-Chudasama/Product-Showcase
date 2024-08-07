import express from "express";
import bodyParser from "body-parser";

import {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

const router = express.Router();

router.post(
  "/create-user",
  // bodyParser.raw({ type: "application/json" }),
  createUser
);

router.get("/getAllUsers", getAllUsers);

router.post(
  "/update-user",
  // bodyParser.raw({ type: "application/json" }),
  updateUser
);

router.post(
  "/delete-user",
  // bodyParser.raw({ type: "application/json" }),
  deleteUser
);

export default router;
