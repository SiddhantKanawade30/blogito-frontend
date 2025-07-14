import React, { useEffect, useState } from "react";

// Sample blog data (replace with API later)
const sampleBlogs = [
  {
    id: 1,
    author: "Jane Doe",
    avatar: "https://i.pravatar.cc/150?img=1",
    title: "10 Tips to Improve Your Writing",
    content: "Writing is an art that can be refined. Here are some actionable tips that will help you write better...",
    date: "July 13, 2025"
  },
  {
    id: 2,
    author: "Siddhant K.",
    avatar: "https://i.pravatar.cc/150?img=12",
    title: "Why React is Still King in 2025",
    content: "React has maintained its dominance due to flexibility, community, and ecosystem support. Let’s dive deeper...",
    date: "July 12, 2025"
  },
  {
    id: 3,
    author: "Alex Johnson",
    avatar: "https://i.pravatar.cc/150?img=15",
    title: "Mental Health for Developers",
    content: "Working long hours in tech? Here’s how to keep your mind sharp and your stress low...",
    date: "July 10, 2025"
  },
  
  {
    id: 2,
    author: "Siddhant K.",
    avatar: "https://i.pravatar.cc/150?img=12",
    title: "Why React is Still King in 2025",
    content: "React has maintained its dominance due to flexibility, community, and ecosystem support. Let’s dive deeper...",
    date: "July 12, 2025"
  },
  {
    id: 3,
    author: "Alex Johnson",
    avatar: "https://i.pravatar.cc/150?img=15",
    title: "Mental Health for Developers",
    content: "Working long hours in tech? Here’s how to keep your mind sharp and your stress low...",
    date: "July 10, 2025"
  },
];

const Feed = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setBlogs(sampleBlogs);
    }, 500);
  }, []);

  return (
    <div className="mt-5 space-y-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Latest Blogs</h2>

      {blogs.map((blog) => (
        <div
          key={blog.id}
          className="bg-white shadow-sm border rounded-xl p-6 transition hover:shadow-md"
        >
          <div className="flex items-center gap-4 mb-4">
            <img
              src={blog.avatar}
              alt={blog.author}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold text-gray-800">{blog.author}</p>
              <p className="text-xs text-gray-500">{blog.date}</p>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {blog.title}
          </h3>
          <p className="text-gray-700">{blog.content}</p>

          <button className="mt-4 text-sm font-medium text-purple-600 hover:underline">
            Read more →
          </button>
        </div>
      ))}
    </div>
  );
};

export default Feed;
