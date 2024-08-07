import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer";
import bodyParser from "body-parser";

import connectdb from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import freshProductsRoutes from "./routes/freshProductsRoutes.js";
import thriftProductsRoutes from "./routes/thriftProductsRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";
import shoppingCartRoutes from "./routes/shoppingCartRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";

const app = express();
dotenv.config();
app.use("/uploads/freshProducts", express.static("uploads/freshProducts"));
app.use("/uploads/thriftProducts", express.static("uploads/thriftProducts"));
connectdb();

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use((req, res, next) => {
//   if (req.path.startsWith("/api/user")) {
//     bodyParser.raw({ type: "application/json" });
//     next();
//   } else {
//     express.json();
//     next();
//   }
// });

app.use((req, res, next) => {
  if (req.path.startsWith("/api/user")) {
    bodyParser.raw({ type: "application/json" })(req, res, next);
  } else {
    express.json()(req, res, next);
  }
});

app.use(
  cors({
    origin: "*",
  })
);

app.use("/api/user", userRoutes);
app.use("/api/fresh-products", freshProductsRoutes);
app.use("/api/thrift-products", thriftProductsRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/shopping-cart", shoppingCartRoutes);
app.use("/api/review", reviewRoutes);

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.listen(process.env.PORT || 4000, () => {
  console.log(`Server is listening on ${process.env.PORT}`);
});
