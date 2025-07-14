import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import FeedPage from './components/FeedPage';
import EmailVerification from './components/EmailVerification';
import { getAuthToken, userAPI, authAPI } from './utils/api';

function App() {
  // Check if the current page is for email verification
  const isEmailVerificationPage = window.location.pathname === '/verify-email' || window.location.search.includes('token=');
  
  // If it's email verification page, show that component
  if (isEmailVerificationPage) {
    return <EmailVerification />;
  }

  // State to track if user is logged in or not
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  
  // State to store user information
  const [currentUser, setCurrentUser] = useState(null);
  
  // State to show loading spinner while checking if user is logged in
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // When app first loads, check if user is already logged in
  useEffect(() => {
    const checkIfUserIsLoggedIn = async () => {
      // Check if there's a saved login token
      const savedToken = getAuthToken();
      
      if (savedToken) {
        try {
          // Token exists, try to get user info from server
          console.log('Found saved token, checking if still valid...');
          const userData = await userAPI.getMyProfile();
          
          // Token is valid, user is logged in
          setCurrentUser(userData);
          setIsUserLoggedIn(true);
          console.log('User is logged in:', userData);
        } catch (error) {
          // Token is invalid or expired, log user out
          console.error('Saved token is invalid:', error);
          authAPI.logout(); // Remove the bad token
        }
      }
      
      // Done checking, hide loading spinner
      setIsCheckingAuth(false);
    };

    checkIfUserIsLoggedIn();
  }, []); // Empty array means this runs once when app starts

  // Function to handle user login
  const handleUserLogin = async (email, password) => {
    try {
      console.log('Trying to log in user...');
      
      // Try to log in with the backend
      const response = await authAPI.signin(email, password);
      
      // Login successful, get user information
      const userData = await userAPI.getMyProfile();
      
      // Update app state
      setCurrentUser(userData);
      setIsUserLoggedIn(true);
      
      console.log('Login successful!');
      return { success: true };
      
    } catch (error) {
      console.error('Login failed:', error);
      return { success: false, error: error.message };
    }
  };

  // Function to handle user signup
  const handleUserSignup = async (username, email, password) => {
    try {
      console.log('Trying to sign up user...');
      
      // Try to create account with the backend
      await authAPI.signup(username, email, password);
      
      console.log('Signup successful!');
      return { 
        success: true, 
        message: 'Account created! Please check your email to verify your account.' 
      };
      
    } catch (error) {
      console.error('Signup failed:', error);
      return { success: false, error: error.message };
    }
  };

  // Function to handle user logout
  const handleUserLogout = () => {
    console.log('Logging out user...');
    
    // Remove login token and reset app state
    authAPI.logout();
    setIsUserLoggedIn(false);
    setCurrentUser(null);
    
    console.log('User logged out');
  };

  // Show loading spinner while checking authentication
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Main app content
  
  return (
    <div className="min-h-screen bg-gray-50">
      {!isUserLoggedIn ? (
        // User is not logged in, show landing page with login/signup
        <LandingPage 
          onLogin={handleUserLogin} 
          onSignup={handleUserSignup} 
        />
      ) : (
        // User is logged in, show the main app
        <FeedPage 
          user={currentUser} 
          onLogout={handleUserLogout} 
        />
      )}
      <Routes>
   <Route path="/" element={<FeedPage />} />
   </Routes>
    </div>
  );
}

export default App;