import React, { useState, useEffect } from 'react';
import { Edit, MapPin, Calendar, Link2 } from 'lucide-react';
import { blogAPI } from '../utils/api';

const Profile = ({ user }) => {
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const posts = await blogAPI.getMyBlogs();
        setUserPosts(posts);
      } catch (error) {
        console.error('Error fetching user posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserPosts();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center space-x-6">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-2xl">
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{user?.username || 'User'}</h1>
                <p className="text-gray-600 mb-4">Writer & Developer</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>San Francisco, CA</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>Joined {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Recently'}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Link2 className="h-4 w-4" />
                    <span>portfolio.dev</span>
                  </div>
                </div>
              </div>
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Edit className="h-4 w-4" />
              <span>Edit Profile</span>
            </button>
          </div>

          <p className="text-gray-700 leading-relaxed mb-6">
            Passionate about creating amazing web experiences and sharing knowledge with the developer community. 
            I write about React, TypeScript, and modern web development practices.
          </p>

          <div className="grid grid-cols-3 gap-8 pt-6 border-t border-gray-200">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{userPosts.length}</div>
              <div className="text-gray-600">Posts</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">1.2K</div>
              <div className="text-gray-600">Followers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">486</div>
              <div className="text-gray-600">Following</div>
            </div>
          </div>
        </div>

        {/* User Posts */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">My Posts</h2>
          
          {loading ? (
            <div className="animate-pulse space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="border-b border-gray-200 pb-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {userPosts.length === 0 ? (
                <p className="text-gray-600 text-center py-8">You haven't written any blog posts yet.</p>
              ) : (
                userPosts.map((post) => (
                  <div key={post.id} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-blue-600 cursor-pointer transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-2">{post.content?.substring(0, 150)}...</p>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>Published {formatDate(post.createdAt)}</span>
                      <div className="flex items-center space-x-4">
                        <span>{post.likes || 0} likes</span>
                        <span>{post.comments || 0} comments</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;