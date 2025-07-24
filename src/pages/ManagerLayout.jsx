import React from "react";
import { Outlet } from "react-router-dom";
import SideNavbar from "../components/SideNavbar"; 

const ManagerLayout = () => {
  return (
    <div className="flex">
      <SideNavbar />
      <main className="md:ml-64 w-full p-6 pt-20 md:pt-8 min-h-screen bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
};

export default ManagerLayout;
