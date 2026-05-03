import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Home from "./pages/home";
import AdminUsersPage from "./pages/AdminUsersPage";
import Products from "./pages/productPage";
import Dashboard from "./pages/dashboard";
import ProductDetails from "./pages/productDetails";
import { Toaster } from "react-hot-toast";
import AdminCarts from "./pages/AdminCarts";
import CartDetails from "./pages/CartDetails";

const App = () => {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="home" element={<Home />} />
          <Route path="users" element={<AdminUsersPage />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:id" element={<ProductDetails />} />
          <Route path="carts" element={<AdminCarts />} />
          <Route path="carts/:id" element={<CartDetails />} />

        </Route>
      </Routes>
    </>
  );
};

export default App;
