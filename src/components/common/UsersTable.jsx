import React from "react";

// Component للـ Table Header لتقليل التكرار
const Th = ({ children, className = "" }) => (
  <th
    className={`px-4 py-2 text-left text-gray-600 uppercase text-sm tracking-wider ${className}`}
  >
    {children}
  </th>
);

// Component للـ Table Cell لتقليل التكرار
const Td = ({ children, className = "" }) => (
  <td className={`px-4 py-2 border-t ${className}`}>{children}</td>
);

// Component عام لأزرار الإجراءات
const ActionButton = ({ type, onClick, children }) => {
  const styles =
    type === "edit"
      ? "bg-yellow-500 hover:bg-yellow-600"
      : "bg-red-500 hover:bg-red-600";

  return (
    <button
      onClick={onClick}
      className={`${styles} px-3 py-1 rounded text-white text-sm transition-colors`}
    >
      {children}
    </button>
  );
};

const UsersTable = ({ users, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden shadow-sm">
        <thead className="bg-gray-100">
          <tr>
            <Th>ID</Th>
            <Th>Username</Th>
            <Th>Email</Th>
            <Th className="text-center">Actions</Th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <Td colSpan="4" className="text-center text-gray-500 py-4">
                No users found.
              </Td>
            </tr>
          ) : (
            users.map((user) => (
              <tr
                key={user.id}
                className="hover:bg-gray-50 transition-colors duration-200"
              >
                <Td>{user.id}</Td>
                <Td>{user.username}</Td>
                <Td>{user.email}</Td>
                <Td className="flex justify-center space-x-2">
                  <ActionButton type="edit" onClick={() => onEdit(user)}>
                    Edit
                  </ActionButton>
                  <ActionButton type="delete" onClick={() => onDelete(user.id)}>
                    Delete
                  </ActionButton>
                </Td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
