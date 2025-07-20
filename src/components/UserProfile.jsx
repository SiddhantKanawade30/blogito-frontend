import axios from "axios";
import React, { useState, useEffect } from "react";

const UserProfile = () => {
  const [tab, setTab] = useState("blogs");
  const [userData, setUserData] = useState(null);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem("authorization"); // ✅ already contains Bearer

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/users/me`, {
          headers: {
            Authorization: token, // ✅ token already prefixed with Bearer
          },
        });
        setUserData(response.data);
      } catch (err) {
        console.error("Error fetching user data:", err.response?.data || err.message);
      }
    };

    fetchProfile();
  }, [backendUrl]);

  if (!userData) return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          <p className="ml-4 text-gray-600 font-medium">Loading profile...</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="max-w-5xl mx-auto p-6">
        {/* Profile Header Card */}
        <div className="bg-white/70 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-gray-200/50 mb-8 relative overflow-hidden">
          {/* Subtle background pattern */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-gray-100/30 to-gray-200/30 rounded-full -translate-y-8 translate-x-8"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-gray-100/50 to-slate-100/50 rounded-full translate-y-6 -translate-x-6"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Avatar placeholder */}
            <div className="w-20 h-20 bg-gray-700 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white text-2xl font-bold">
                {userData.userName?.charAt(0).toUpperCase() || 'U'}
              </span>
            </div>
            
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">
                {userData.userName}
              </h1>
              <p className="text-gray-600 text-lg font-medium mb-1">{userData.email}</p>
              <div className="flex items-center gap-4 mt-4">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-2 mb-8">
          <div className="flex gap-2">
            {["blogs", "followers", "following"].map((item) => (
              <button
                key={item}
                className={`flex-1 py-4 px-6 rounded-xl capitalize text-sm font-semibold transition-all duration-300 transform hover:scale-[1.02] ${
                  tab === item
                    ? " bg-gray-700 text-white shadow-lg shadow-gray-500/25"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100/80"
                }`}
                onClick={() => setTab(item)}
              >
                <span className="relative">
                  {item}
                  {tab === item && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full"></div>
                  )}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-8 min-h-96">
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl mx-auto mb-4 flex items-center justify-center">
              <div className="w-8 h-8 bg-gray-400 rounded-lg opacity-50"></div>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2 capitalize">
              {tab} Content
            </h3>
            <p className="text-gray-500">
              Your {tab} will appear here once loaded.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;