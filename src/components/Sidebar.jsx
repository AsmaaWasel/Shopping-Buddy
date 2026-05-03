import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const links = [
    { name: "Home", path: "home" },
    { name: "Users", path: "users" },
    { name: "Products", path: "products" },
    { name: "Carts", path: "carts" },
  ];

  return (
    <aside className="w-64 bg-gray-300 p-4 flex flex-col">
      {/* Header جوه Sidebar */}
      <div className="mb-6">
        <h1 className="text-xl font-bold">Shopping Buddy</h1>
      </div>

      {/* Links */}
      <ul className="space-y-4 flex-1">
        {links.map((link) => (
          <li key={link.name} className="font-medium hover:text-indigo-600">
            <Link to={link.path}>{link.name}</Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
