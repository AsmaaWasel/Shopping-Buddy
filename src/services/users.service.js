// services/users.service.js
import { api } from "./api";

export const getAllUsers = async () => {
  const res = await api.get("/users");
  return res.data;
};

export const getUserByUsername = async (username) => {
  const res = await api.get("/users");
  return res.data.find((u) => u.username === username);
};

export const getUserById = async (id) => {
  const res = await api.get(`/users/${id}`);
  return res.data;
};

// Create
export const createUser = async (payload) => {
  const res = await api.post("/users", payload);
  return res.data;
};

// Update
export const updateUser = async (id, payload) => {
  const res = await api.put(`/users/${id}`, payload);
  return res.data;
};

// Delete
export const deleteUser = async (id) => {
  const res = await api.delete(`/users/${id}`);
  return res.data;
};
