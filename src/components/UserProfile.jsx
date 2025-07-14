import React, { useState, useEffect } from "react";

// Dummy user + blog data
const userData = {
  name: "Siddhant K.",
  email: "siddhant@example.com",
  avatar: "https://i.pravatar.cc/150?img=12",
  followers: ["Jane Doe", "Alex J.", "John S."],
  following: ["React Dev", "UI Guru"],
  blogs: [
    {
      id: 1,
      title: "My Journey into Web Dev",
      snippet: "It all started with a simple HTML page and a lot of curiosity...",
      date: "July 13, 2025",
    },
    {
      id: 2,
      title: "Why Tailwind is My Go-To",
      snippet: "After trying CSS frameworks for years, Tailwind just clicked...",
      date: "July 11, 2025",
    },
  ],
};

const UserProfile = () => {
  const [tab, setTab] = useState("blogs");

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Profile Header */}
      <div className="bg-white p-6 rounded-xl shadow flex flex-col md:flex-row items-center gap-6 mb-6">
        <img
          src={userData.avatar}
          alt={userData.name}
          className="w-24 h-24 rounded-full object-cover border-2 border-purple-500"
        />
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{userData.name}</h2>
          <p className="text-gray-500">{userData.email}</p>
          <div className="flex gap-6 mt-3 text-sm text-gray-600">
            <span>{userData.followers.length} Followers</span>
            <span>{userData.following.length} Following</span>
            <span>{userData.blogs.length} Blogs</span>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
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

      {/* Tab Content */}
      {tab === "blogs" && (
        <div className="space-y-4">
          {userData.blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white p-5 rounded-lg shadow hover:shadow-md transition"
            >
              <h3 className="text-lg font-semibold text-gray-800">
                {blog.title}
              </h3>
              <p className="text-gray-600 text-sm mt-1">{blog.date}</p>
              <p className="text-gray-700 mt-2">{blog.snippet}</p>
              <button className="mt-3 text-sm text-purple-600 hover:underline">
                Read more →
              </button>
            </div>
          ))}
        </div>
      )}

      {tab === "followers" && (
        <ul className="bg-white p-5 rounded-lg shadow space-y-2">
          {userData.followers.map((name, i) => (
            <li key={i} className="text-gray-800">{name}</li>
          ))}
        </ul>
      )}

      {tab === "following" && (
        <ul className="bg-white p-5 rounded-lg shadow space-y-2">
          {userData.following.map((name, i) => (
            <li key={i} className="text-gray-800">{name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserProfile;
