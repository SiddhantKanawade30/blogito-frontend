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

  if (!userData) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white p-6 rounded-xl shadow flex flex-col md:flex-row items-center gap-6 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{userData.userName}</h2>
          <p className="text-gray-500">{userData.email}</p>
        </div>
      </div>

      <div className="flex gap-4 mb-6 border-b">
        {["blogs", "followers", "following"].map((item) => (
          <button
            key={item}
            className={`pb-2 capitalize text-sm font-medium border-b-2 ${
              tab === item
                ? "border-purple-600 text-purple-600"
                : "border-transparent text-gray-500 hover:text-black"
            }`}
            onClick={() => setTab(item)}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Handle tabs if needed */}
    </div>
  );
};

export default UserProfile;
