import { useState, useEffect } from "react";
import {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../../services/users.service";

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  // Fetch all users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await getAllUsers();
      setUsers(data);
    } catch (err) {
      setError(err.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  // Add user
const addUser = async (user) => {
  try {
    setLoading(true);
    await createUser(user);

    setUsers((prev) => [
      ...prev,
      {
        ...user,
        id: Date.now(),
      },
    ]);
  } catch (err) {
    setError(err.message || "Failed to add user");
  } finally {
    setLoading(false);
  }
};



  // Edit user
  const editUser = async (id, user) => {
    try {
      setLoading(true);
      const updated = await updateUser(id, user);
      setUsers((prev) => prev.map((u) => (u.id === id ? updated : u)));
      setSelectedUser(null);
    } catch (err) {
      setError(err.message || "Failed to update user");
    } finally {
      setLoading(false);
    }
  };

  // Delete user
  const removeUser = async (id) => {
    try {
      setLoading(true);
      await deleteUser(id);
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      setError(err.message || "Failed to delete user");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    loading,
    error,
    selectedUser,
    setSelectedUser,
    fetchUsers,
    addUser,
    editUser,
    removeUser,
  };
};
