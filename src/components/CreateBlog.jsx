import React, { useState } from 'react';
import { Save, Eye, Tag } from 'lucide-react';
import { blogAPI } from '../utils/api';

const CreateBlog = () => {
  const [blogData, setBlogData] = useState({
    title: '',
    content: '',
    tags: '',
  });
  const [preview, setPreview] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setBlogData({
      ...blogData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const tagsArray = blogData.tags ? blogData.tags.split(',').map(tag => tag.trim()).filter(tag => tag) : [];
      
      await blogAPI.createBlog({
        title: blogData.title,
        content: blogData.content,
        tags: tagsArray,
      });

      setMessage('Blog post created successfully!');
      setBlogData({ title: '', content: '', tags: '' });
      setPreview(false);
    } catch (error) {
      setError(error.message || 'Failed to create blog post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Create New Blog Post</h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setPreview(!preview)}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Eye className="h-4 w-4" />
              <span>{preview ? 'Edit' : 'Preview'}</span>
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading || !blogData.title || !blogData.content}
              className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="h-4 w-4" />
              <span>{loading ? 'Publishing...' : 'Publish'}</span>
            </button>
          </div>
        </div>

        {message && (
          <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
            {message}
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {!preview ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-lg font-semibold text-gray-900 mb-3">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={blogData.title}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xl"
                placeholder="Enter your blog title..."
                required
              />
            </div>

            <div>
              <label htmlFor="tags" className="block text-lg font-semibold text-gray-900 mb-3">
                <Tag className="h-5 w-5 inline mr-2" />
                Tags
              </label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={blogData.tags}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter tags separated by commas..."
              />
            </div>

            <div>
              <label htmlFor="content" className="block text-lg font-semibold text-gray-900 mb-3">
                Content
              </label>
              <textarea
                id="content"
                name="content"
                value={blogData.content}
                onChange={handleChange}
                rows={20}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Write your blog content here..."
                required
              />
            </div>
          </form>
        ) : (
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{blogData.title || 'Your Blog Title'}</h2>
            
            {blogData.tags && (
              <div className="flex flex-wrap gap-2 mb-6">
                {blogData.tags.split(',').map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                  >
                    {tag.trim()}
                  </span>
                ))}
              </div>
            )}
            
            <div className="prose prose-lg max-w-none">
              <p className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                {blogData.content || 'Your blog content will appear here...'}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateBlog;