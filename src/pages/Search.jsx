import { useState } from 'react';
import api from '../services/api';
import BlogCard from '../components/BlogCard';

export default function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await api.get(`/users/search?name=${query}`);
      setResults(res.data); // expected: list of users with their blogs
    } catch (err) {
      alert(err.response?.data || 'Search failed');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <form onSubmit={handleSearch} className="mb-6 flex gap-2">
        <input
          type="text"
          placeholder="Search writers by name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 p-3 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-black dark:text-white"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Search
        </button>
      </form>

      {results.length === 0 && <p className="text-gray-500 text-center">No writers found.</p>}

      {results.map((user) => (
        <div key={user._id} className="mb-8">
          <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{user.name || user.email}</h3>
          {user.blogs?.length > 0 ? (
            user.blogs.map((blog) => <BlogCard key={blog._id} blog={blog} />)
          ) : (
            <p className="text-sm text-gray-500 ml-2">No blogs yet.</p>
          )}
        </div>
      ))}
    </div>
  );
}
