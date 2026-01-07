import React, { useState, useEffect } from "react";

const UserForm = ({ user, onSubmit, onCancel }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setEmail(user.email);
      setPassword(user.password || "");
    }
  }, [user]);

const handleSubmit = (e) => {
  e.preventDefault();

 const payload = { username, email, password };
onSubmit(payload);


  setUsername("");
  setEmail("");
  setPassword("");
};


  return (
    <form onSubmit={handleSubmit} className="space-y-2 border p-4 rounded shadow">
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        className="w-full border p-2 rounded"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full border p-2 rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required={!user} // required only for new users
        className="w-full border p-2 rounded"
      />
      <div className="flex space-x-2">
        <button type="submit" className="bg-green-500 px-4 py-2 text-white rounded">
          {user ? "Update" : "Add"} User
        </button>
        <button type="button" onClick={onCancel} className="bg-gray-400 px-4 py-2 text-white rounded">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default UserForm;
