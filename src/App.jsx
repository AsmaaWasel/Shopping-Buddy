import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Home from "./pages/home";
import AdminUsersPage from "./pages/AdminUsersPage";
import Products from "./pages/productPage";
import Dashboard from "./pages/dashboard";
import ProductDetails from "./pages/productDetails";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />}>
        <Route path="home" element={<Home />} />
        <Route path="users" element={<AdminUsersPage />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:id" element={<ProductDetails />} />
      </Route>
    </Routes>
  );
};

export default App;
