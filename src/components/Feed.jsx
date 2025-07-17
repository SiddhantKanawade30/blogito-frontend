import React, { useEffect, useState } from "react";
import axios from "axios";


const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Feed = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async() =>{ 
      try{
        const res =  await axios.get(`${backendUrl}/api/blogs`)
      setBlogs(res.data)
      }catch(err){
        console.error("Error fetching blogs:", err);
        setBlogs([]); 
      }
     
    }
    fetchBlogs();
  }, []);

  return (
    <div className="mt-5 space-y-10 max-w-3xl mx-10 ">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Latest Blogs</h2>

      {blogs.map((blog) => (
        <div
          key={blog.id}
          className="bg-white shadow-sm border rounded-xl p-6 transition hover:shadow-md"
        >
          <div className="flex items-center gap-4 mb-4">
            {/* <img
              src={blog.avatar}
              alt={blog.author}
              className="w-10 h-10 rounded-full object-cover"
            /> */}
            <div>
              <p className="font-semibold text-gray-800">{blog.author?.email || "Unknown author"}</p>
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
