import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const links = [
    { name: "Home", path: "home" },
    { name: "Users", path: "users" },
    { name: "Products", path: "products" },
  ];

  return (
    <aside className="w-64 h-screen bg-gray-300 p-4">
      <ul className="space-y-4">
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
