// services/products.service.js
import { api } from "./api";

export const getAllProducts = async () => {
  const res = await api.get("/products");
  return res.data;
};

export const getProductById = async (id) => {
  const res = await api.get(`/products/${id}`);
  return res.data;
};

// Create
export const createProduct = async (payload) => {
  const res = await api.post("/products", payload);
  return res.data;
};

// Update
export const updateProduct = async (id, payload) => {
  const res = await api.put(`/products/${id}`, payload);
  return res.data;
};

// Delete
export const deleteProduct = async (id) => {
  const res = await api.delete(`/products/${id}`);
  return res.data;
};