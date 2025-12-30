// services/carts.service.js
import { api } from "./api";

export const getAllCarts = async () => {
  const res = await api.get("/carts");
  return res.data;
};

export const getCartByUserId = async (userId) => {
  const res = await api.get(`/carts/user/${userId}`);
  return res.data;
};

export const getCartById = async (id) => {
  const res = await api.get(`/carts/${id}`);
  return res.data;
};

// Create
export const createCart = async (payload) => {
  const res = await api.post("/carts", payload);
  return res.data;
};

// Update
export const updateCart = async (id, payload) => {
  const res = await api.put(`/carts/${id}`, payload);
  return res.data;
};

// Delete
export const deleteCart = async (id) => {
  const res = await api.delete(`/carts/${id}`);
  return res.data;
};