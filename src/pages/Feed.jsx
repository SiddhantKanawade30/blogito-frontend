// pages/Feed.jsx
import { useEffect, useState } from "react";
import api from "../services/api";
import BlogCard from "../components/BlogCard";

export default function Feed() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    api.get("/blogs").then(res => setBlogs(res.data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Feed</h1>
      <div className="space-y-4">
        {blogs.map(blog => <BlogCard key={blog._id} blog={blog} />)}
      </div>
    </div>
  );
}
