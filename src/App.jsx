import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login";
import Home from "./pages/home";

import { AuthContext } from "./context/AuthContext";

const App = () => {
  return (
    <Routes>
      {/* صفحة اللوجن */}
      <Route path="/login" element={<Login />} />

      {/* الصفحة الرئيسية */}
      <Route path="/" element={<Home />} />
    </Routes>
  );
};

export default App;
