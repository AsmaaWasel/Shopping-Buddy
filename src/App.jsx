import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Home from "./pages/home";
import AdminUsersPage from "./pages/AdminUsersPage";
import Dashboard from "./pages/dashboard";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />}>
        <Route path="home" element={<Home />} />
        <Route path="users" element={<AdminUsersPage />} />
      </Route>
    </Routes>
  );
};

export default App;
