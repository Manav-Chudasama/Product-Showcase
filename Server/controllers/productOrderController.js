import mongoose from "mongoose";
import ProductOrderModel from "../models/ProductOrderModel.js";

export const createProductOrder = async (req, res) => {
  console.log(req.body);

  res.json({ data: req.body });
};
