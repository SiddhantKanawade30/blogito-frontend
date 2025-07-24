import React, { useEffect, useState } from "react";
import axios from "axios";
import { Calendar, User, ArrowRight, Clock } from "lucide-react";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Feed = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async() =>{ 
      try{
        setLoading(true);
        const res = await axios.get(`${backendUrl}/api/blogs`)
        setBlogs(res.data)
      }catch(err){
        console.error("Error fetching blogs:", err);
        setBlogs([]); 
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-8 h-8 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 text-lg">Loading blogs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-6 py-8">
      
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Latest Blogs</h1>
          <p className="text-gray-600">Discover the latest stories and insights from our community</p>
          <div className="w-24 h-1 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full mt-4"></div>
        </div>

        {/* Blogs Container */}
        <div className="space-y-8">
          {blogs.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
              
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No blogs yet</h3>
              <p className="text-gray-600">Be the first to share your thoughts with the community!</p>
            </div>
          ) : (
            blogs.map((blog) => (
              <article
                key={blog.id}
                className="bg-white shadow-sm border border-gray-200 rounded-2xl p-8 transition-all duration-300 hover:shadow-lg hover:border-gray-300 group"
              >
                {/* Author  */}
                <div className="flex items-center gap-4 mb-6">
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <User size={16} className="text-gray-500" />
                      <p className="font-semibold text-gray-800">
                        {blog.author?.email || "Unknown author"}
                      </p>
                    </div>
                    {blog.date && (
                      <div className="flex items-center gap-2 mt-1">
                        <Calendar size={14} className="text-gray-400" />
                        <p className="text-sm text-gray-500">{blog.date}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Blog Content */}
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-gray-700 transition-colors duration-200">
                    {blog.title}
                  </h2>
                  <div
                    className="text-gray-700 prose prose-gray max-w-none leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                  />
                </div>

                {/* Read More Button */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock size={14} />
                    <span>5 min read</span>
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all duration-200 group">
                    <span>Read more</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
                  </button>
                </div>
              </article>
            ))
          )}
        </div>

        {/* LoadMore  */}
        {blogs.length > 0 && (
          <div className="text-center mt-12">
            <button className="px-8 py-3 bg-white border-2 border-gray-300 text-gray-700 font-medium rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 shadow-sm">
              Load More Articles
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Feed;
