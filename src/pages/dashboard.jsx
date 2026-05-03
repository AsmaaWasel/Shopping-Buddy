import React from "react";
import { Outlet } from "react-router-dom"; // هنعرض المحتوى المتغير هنا
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 overflow-auto ">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;

