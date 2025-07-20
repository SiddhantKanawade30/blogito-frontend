import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  Home,
  PlusCircle,
  Settings,
  LogOut,
  User,
  Menu,
  X,
} from "lucide-react";

const backendUrl = import.meta.env.VITE_BACKEND_URL;
const token = localStorage.getItem("authorization");

const SideNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/users/me`, {
          headers: {
            Authorization: token,
          },
        });
        setUserData(response.data);
      } catch (err) {
        console.error("Error fetching user data:", err.response?.data || err.message);
      }
    };
    fetchProfile();
  }, []);

  if (!userData) return <p className="text-center mt-10 text-gray-700 text-lg">Loading...</p>;

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between bg-white border-b border-gray-200 px-6 py-4 shadow-lg fixed w-full z-50">
        <div className="text-xl font-bold text-gray-800">{userData.userName}</div>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-700 hover:text-gray-900 transition-colors duration-200 p-2 hover:bg-gray-100 rounded-lg"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-white border-r border-gray-200 shadow-xl z-40 transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 w-72 flex flex-col`}
      >
        {/* Profile Section */}
        <div className="flex items-center space-x-4 px-6 py-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
          <div onClick={()=>navigate("/manager/profile")} className="w-12 h-12 cursor-pointer bg-gradient-to-br from-gray-500 to-gray-800 rounded-full flex items-center justify-center shadow-md">
            <span className="text-white font-bold text-lg">
              {userData.userName.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-bold text-gray-900 text-lg truncate">{userData.userName}</div>
            <div className="text-sm text-gray-600 truncate">{userData.email}</div>
          </div>
        </div>

        {/* Nav Links */}
        <div className="flex-1 overflow-y-auto mt-2 px-4">
          <Section label="Quick Actions">
            <NavItem icon={<Home size={18} />} label="Feed" onClick={() => navigate("/manager/feed")} />
            <NavItem icon={<PlusCircle size={18} />} label="Create" onClick={() => navigate("/manager/create")} />
            <NavItem icon={<User size={18} />} label="Profile" onClick={() => navigate("/manager/profile")} />
            <NavItem icon={<Settings size={18} />} label="Settings" onClick={() => navigate("/manager/settings")} />
          </Section>
        </div>

        {/* Logout Button */}
        <div className="px-4 py-6 border-t border-gray-200 bg-gradient-to-r from-white to-gray-50">
          <button
            onClick={() => {
              localStorage.removeItem("authorization");
              navigate("/");
            }}
            className="flex items-center w-full space-x-3 px-4 py-3 rounded-xl text-gray-700 hover:text-red-600 hover:bg-red-50 transition-all duration-200 group border border-transparent hover:border-red-200"
          >
            <LogOut size={20} className="group-hover:rotate-12 transition-transform duration-200" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

const Section = ({ label, children }) => (
  <div className="mb-6">
    <h4 className="text-xs text-gray-500 uppercase tracking-wide font-semibold px-4 mb-3 border-l-2 border-gray-300">{label}</h4>
    <div className="space-y-1">{children}</div>
  </div>
);

const NavItem = ({ icon, label, onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-100 cursor-pointer hover:text-gray-900 transition-all duration-200 w-full text-left group border border-transparent hover:border-gray-200 hover:shadow-sm"
  >
    <span className="group-hover:scale-110 transition-transform duration-200">
      {icon}
    </span>
    <span className="text-base font-medium">{label}</span>
  </button>
);

export default SideNavbar;