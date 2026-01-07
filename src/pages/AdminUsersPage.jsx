import React, { useState, useEffect } from "react";
import { useUsers } from "../features/users/useUsers";
import UsersTable from "../components/common/UsersTable";
import ConfirmModal from "../components/common/ConfirmModal";
import AddButton from "../components/common/AddButton";
import GenericModal from "../components/common/GenericModal";


import toast from "react-hot-toast";

import SplashLoader from "../components/common/SplashLoader";
import UsersActions from "../components/admin/UsersActions";

const AdminUsersPage = () => {
  const { users, loading, error, selectedUser, setSelectedUser, addUser, editUser, removeUser } = useUsers();
  const [showForm, setShowForm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleAdd = () => { setSelectedUser(null); setShowForm(true); };
  const handleEdit = (user) => { setSelectedUser(user); setShowForm(true); };
  const handleCancel = () => { setSelectedUser(null); setShowForm(false); };

  const handleSubmit = async (user) => {
    try {
      if (selectedUser) await editUser(selectedUser.id, user);
      else await addUser(user);
      toast.success(selectedUser ? "User updated!" : "User added!");
      setShowForm(false);
    } catch (err) {
      toast.error(err.message || "Operation failed!");
    }
  };

  const confirmDelete = (id) => setDeleteId(id);
  const handleDelete = async () => {
    try { await removeUser(deleteId); toast.success("User deleted!"); }
    catch (err) { toast.error(err.message || "Delete failed!"); }
    finally { setDeleteId(null); }
  };

  if (showSplash) return <SplashLoader />;

  return (

    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Users</h1>
        <AddButton onClick={handleAdd} label="Add User" />
      </div>

      {loading && <SplashLoader />}
      {error && <p className="text-red-500">{error}</p>}

     {showForm && (
  <GenericModal
    onClose={handleCancel}
    title={selectedUser ? "Edit User" : "Add User"}
  >
    <div className="w-full">
      <UsersActions
        showForm={true} 
        selectedUser={selectedUser}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        
      />

    </div>
  </GenericModal>
)}


      <UsersTable users={users} onEdit={handleEdit} onDelete={confirmDelete} />

{deleteId && (
  <GenericModal
    onClose={() => setDeleteId(null)}
    title="Delete User"
  >
    <p className="mb-4 text-center text-lg font-medium">
      Are you sure you want to delete this user?
    </p>
    <div className="flex justify-center space-x-4">
      <button
        onClick={handleDelete}
        className="bg-red-500 px-4 py-2 text-white rounded"
      >
        Yes
      </button>
      <button
        onClick={() => setDeleteId(null)}
        className="bg-gray-400 px-4 py-2 text-white rounded"
      >
        Cancel
      </button>
    </div>
  </GenericModal>
)}
    </div>
  );
};

export default AdminUsersPage;
