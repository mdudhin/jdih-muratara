import Navbar from "../../components/admin/navbar";
import { Outlet } from "react-router-dom";
import React from "react";
import Sidebar from "@/components/admin/sidebar";

const LayoutAdmin = () => {
  return (
    <div className="flex flex-row h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col w-full overflow-hidden">
        <Navbar />
        <div className="overflow-y-auto h-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default LayoutAdmin;
