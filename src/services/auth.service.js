// services/auth.service.js
import { api } from "./api";

export const login = async (username, password) => {
  try {
    const res = await api.post("/auth/login", {
      username,
      password,
    });
    console.log("LOGIN RESPONSE ✅", res.data);

    return res.data.token;
  } catch (error) {
    // throw new Error("Login failed");
    console.error("LOGIN ERROR ❌", {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
    });
  }
};
