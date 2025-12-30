import { useState } from "react";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <AuthContext.Provider
      value={{ user, isAdmin, setUser, token, setToken, setIsAdmin }}
    >
      {children}
    </AuthContext.Provider>
  );
};
