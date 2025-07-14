import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Home,
  PlusCircle,
  Settings,
  LogOut,
  User,
  Menu,
  X,
} from "lucide-react";

const SideNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
   const navigate = useNavigate();

  return (
    <>
      {/* Top bar for mobile */}
      <div className="md:hidden flex items-center justify-between bg-white px-4 py-3 shadow fixed w-full z-50">
        <div className="text-xl font-bold">Blogito</div>
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-white border-r shadow-lg z-40 transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 w-64`}
      >
        {/* Brand */}
        <div className="text-2xl font-bold px-6 py-5 border-b hidden md:block">
          Blogito
        </div>

        {/* Navigation */}
        <nav className="mt-4 flex flex-col space-y-2 px-4">
            <div onClick={()=> navigate("/feed")}>
          <NavItem icon={<Home size={20} />} label="Feed"  />
            </div>

            <div onClick={()=> navigate("/create")}>
          <NavItem icon={<PlusCircle size={20} />} label="Create" />
            </div>

            <div onClick={()=> navigate("/profile")}>
          <NavItem icon={<User size={20} />} label="Profile" />
          </div>

          <div onClick={()=> navigate("/settings")}>
          <NavItem icon={<Settings size={20} />} label="Settings" />
          </div>

        </nav>

        {/* Logout */}
        <div className="absolute bottom-0 w-full px-4 py-6 border-t">
          <button
            
            className="flex items-center w-full space-x-3 text-gray-700 hover:text-red-500 transition"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

const NavItem = ({ icon, label }) => (
  <button className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-black transition w-full text-left">
    {icon}
    <span className="text-base font-medium">{label}</span>
  </button>
);

export default SideNavbar;
