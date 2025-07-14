import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import FeedPage from './components/FeedPage';
import { getAuthToken, userAPI, authAPI } from './utils/api';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = getAuthToken();
      if (token) {
        try {
          const userData = await userAPI.getMyProfile();
          setUser(userData);
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Auth check failed:', error);
          authAPI.logout();
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const handleLogin = async (email, password) => {
    try {
      const response = await authAPI.signin({ email, password });
      const userData = await userAPI.getMyProfile();
      setUser(userData);
      setIsAuthenticated(true);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const handleSignup = async (name, email, password) => {
    try {
      await authAPI.signup({ name, email, password });
      return { 
        success: true, 
        message: 'Account created! Please check your email to verify your account.' 
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const handleLogout = () => {
    authAPI.logout();
    setIsAuthenticated(false);
    setUser(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {!isAuthenticated ? (
        <LandingPage onLogin={handleLogin} onSignup={handleSignup} />
      ) : (
        <FeedPage user={user} onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;