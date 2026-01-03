import React from "react";
import { Outlet } from "react-router-dom"; // هنعرض المحتوى المتغير هنا
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />

      <div className="flex flex-1">
        <Sidebar />

        {/* كل صفحة من صفحات الداشبورد هتظهر هنا */}
        <main className="flex-1 bg-gray-100 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
