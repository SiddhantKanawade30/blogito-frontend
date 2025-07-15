import React, { useState } from "react";
import axios from "axios";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");

  const handlePublish = async () => {
    if (!title || !content) {
      alert("Title and content are required.");
      return;
    }

    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      const token = localStorage.getItem("authorization");



       if (!token) {
      alert("You must be logged in to publish a blog.");
      return;
    }

      const response = await axios.post(`${backendUrl}/api/blogs`, {
        title,
        content,
        tags: tags.split(",").map((tag) => tag.trim()),
      },
      {
        headers: {
          authorization: `${token}`, 
        }});

      alert("Blog published successfully!");
      // Clear inputs
      setTitle("");
      setContent("");
      setTags("");
    } catch (error) {
      console.error("Error publishing blog:", error);
      alert("Failed to publish blog.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Write a New Blog</h2>

      {/* Blog Title */}
      <input
        type="text"
        placeholder="Blog Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full mb-4 p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-purple-600 text-gray-800"
      />

      {/* Blog Content */}
      <textarea
        placeholder="Start writing your blog here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={10}
        className="w-full mb-4 p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-purple-600 text-gray-800 resize-none"
      />

      {/* Tags */}
      <input
        type="text"
        placeholder="Tags (comma separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        className="w-full mb-6 p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-purple-600 text-gray-800"
      />

      {/* Publish Button */}
      <button
        onClick={handlePublish}
        className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition"
      >
        Publish Blog
      </button>
    </div>
  );
};

export default CreateBlog;
