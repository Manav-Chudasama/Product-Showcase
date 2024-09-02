import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Outlet,
} from "react-router-dom";
import HomePage from "./Components/HomePage/HomePage";
import Header from "./Components/Navigation/Header";
import FreshProducts from "./Components/ProductsPage/FreshProducts";
import Footer from "./Components/Footer/Footer";
import ThriftProducts from "./Components/ProductsPage/ThriftProducts";
import About from "./Components/AboutUspage/About";
import ProductDescription from "./Components/ProductsPage/ProductDescription";
import ShoppingCart from "./Components/CartAndWishlist/ShoppingCart";
import Wishlist from "./Components/CartAndWishlist/Wishlist";
import AddProduct from "./Components/ProductsPage/AddProduct";
import Auth from "./Components/UserAuth/Auth";
import AccountProfile from "./Components/UserAuth/AccountProfile";
import UserThriftProducts from "./Components/ProductsPage/UserThriftProducts";
import {
  getAllFreshProducts,
  getAllthriftProducts,
} from "./utils/api/productsApi";

function Layout() {
  const location = useLocation();
  // const containerRef = useRef(null);
  const shouldHideHeaderFooter =
    location.pathname === "/sign-up" || location.pathname === "/sign-in";

  return (
    <div>
      {!shouldHideHeaderFooter && <Header />}
      <Outlet />
      {!shouldHideHeaderFooter && <Footer />}
    </div>
  );
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route
        path="fresh-products"
        element={<FreshProducts />}
        loader={getAllFreshProducts}
      />
      <Route
        path="thrift-products"
        element={<ThriftProducts />}
        loader={getAllthriftProducts}
      />
      <Route path="about-us" element={<About />} />
      <Route
        path="product-description/:id/:productType"
        element={<ProductDescription />}
      />
      <Route path="shopping-cart" element={<ShoppingCart />} />
      <Route path="wishlist" element={<Wishlist />} />
      <Route path="add-product" element={<AddProduct />} />
      <Route path="user-edit-product/:id" element={<AddProduct />} />
      <Route path="sign-up" element={<Auth />} />
      <Route path="sign-in" element={<Auth />} />
      <Route path="account-profile" element={<AccountProfile />} />
      <Route path="user-thrift-products" element={<UserThriftProducts />} />
    </Route>
  )
);

export default function App() {
  return <RouterProvider router={router} />;
}
