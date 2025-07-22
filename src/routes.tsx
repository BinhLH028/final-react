import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/homePage/HomePage";
import ProductListPage from "./pages/productList/ProductListPage";
import ProductDetailPage from "./pages/productList/productDetail/ProductDetailPage";
import CartPage from "./pages/cart/CartPage";
import BlogPage from "./pages/blogPage/BlogPage";
import LoginPage from "./pages/login/LoginPage";
import ProfilePage from "./pages/profilePage/UserProfile.tsx";
import RegisterPage from "./pages/login/RegisterPage";

const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/products" element={<ProductListPage />} />
    <Route path="/product/:id" element={<ProductDetailPage />} />
    <Route path="/cart" element={<CartPage />} />
    <Route path="/blog" element={<BlogPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/profile" element={<ProfilePage />} />
    <Route path="/register" element={<RegisterPage />} />
  </Routes>
);

export default AppRoutes;