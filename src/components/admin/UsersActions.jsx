// src/components/admin/UsersActions.jsx
// UsersActions.jsx
// Admin-specific component used in AdminUsersPage
// Handles Add/Edit user form logic by wrapping UserForm
// Passes onSubmit and onCancel handlers

import React from "react";
import UserForm from "../common/UserForm";

const UsersActions = ({ showForm, selectedUser, onSubmit, onCancel }) => {
  return (
    <div className="mb-4">
      {showForm && (
        <UserForm
          user={selectedUser}
          onSubmit={onSubmit}
          onCancel={onCancel}
        />
      )}
    </div>
  );
};

export default UsersActions;
