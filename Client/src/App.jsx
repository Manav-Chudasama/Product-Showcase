import React from "react";
import HomePage from "./Components/HomePage/HomePage";
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

  const shouldHideHeaderFooter =
    location.pathname === "/sign-up" || location.pathname === "/sign-in";

  return (
    <>
      {!shouldHideHeaderFooter && <Header />}
      {/* <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/fresh-products" element={<FreshProducts />} />
        <Route path="/thrift-products" element={<ThriftProducts />} />
        <Route path="/about-us" element={<About />} />
        <Route
          path="/product-description/:id/:productType"
          element={<ProductDescription />}
          loader={fetch}
        />
        <Route path="/shopping-cart" element={<ShoppingCart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/sign-up" element={<Auth />} />
        <Route path="/sign-in" element={<Auth />} />
        <Route path="/account-profile" element={<AccountProfile />} />
        <Route path="/user-thrift-products" element={<UserThriftProducts />} />
      </Routes> */}
      <Outlet />
      {!shouldHideHeaderFooter && <Footer />}
    </>
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
        // loader={productDescriptionLoader}
      />
      <Route path="shopping-cart" element={<ShoppingCart />} />
      <Route path="wishlist" element={<Wishlist />} />
      <Route path="add-product" element={<AddProduct />} />
      <Route path="sign-up" element={<Auth />} />
      <Route path="sign-in" element={<Auth />} />
      <Route path="account-profile" element={<AccountProfile />} />
      <Route path="user-thrift-products" element={<UserThriftProducts />} />
    </Route>
  )
);

export default function App() {
  return (
    // <Router>
    //   <Layout />
    // </Router>
    <RouterProvider router={router} />
  );
}
