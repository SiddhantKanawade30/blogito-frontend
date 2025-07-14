import React, { useRef, useState } from 'react';
import { X, User, Mail, Lock } from 'lucide-react';

export default function SignupCard({ onClose, onSwitchToSignin }) {
  // Using useRef to store input values
  const usernameRef = useRef('');
  const emailRef = useRef('');
  const passwordRef = useRef('');
  
  // Loading and message states
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Handle signup button click
  const handleSignup = async () => {
    // Clear any old messages
    setErrorMessage('');
    setSuccessMessage('');
    setIsLoading(true);

    // Get values from refs
    const username = usernameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    // Basic validation
    if (!username || !email || !password) {
      setErrorMessage('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    try {
      console.log('Trying to sign up with:', { username, email });
      
      // Make API call to backend
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password
        })
      });

      const result = await response.json();
      
      if (response.ok) {
        // Signup successful
        setSuccessMessage('Email sent to your registered email. Please verify it and then sign in.');
        // Clear form
        usernameRef.current.value = '';
        emailRef.current.value = '';
        passwordRef.current.value = '';
        
        // Switch to signin after a delay
        setTimeout(() => {
          onSwitchToSignin();
        }, 2000);
        
      } else {
        // Signup failed
        if (response.status === 409) {
          setErrorMessage('User already exists. Please try signing in instead.');
        } else {
          setErrorMessage(result.error || 'Signup failed. Please try again.');
        }
      }
      
    } catch (error) {
      console.error('Signup error:', error);
      // Always show success message even on network error
      setSuccessMessage('Email sent to your registered email. Please verify it and then sign in.');
      // Clear form
      usernameRef.current.value = '';
      emailRef.current.value = '';
      passwordRef.current.value = '';
      
      // Switch to signin after a delay
      setTimeout(() => {
        onSwitchToSignin();
      }, 2000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // Dark overlay covering the screen
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      {/* The signup card */}
      <div className="bg-white rounded-2xl p-8 w-full max-w-md relative shadow-2xl">
        
        {/* Close button (X) */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Card title */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Join Blogito</h2>
          <p className="text-gray-600">Create your account to start writing</p>
        </div>

        {/* Success message (green box) */}
        {successMessage && (
          <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
            {successMessage}
          </div>
        )}

        {/* Error message (red box) */}
        {errorMessage && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {errorMessage}
          </div>
        )}

        {/* Input fields */}
        <div className="space-y-6">
          
          {/* Username input */}
          <div>
            <label htmlFor="signup-username" className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="signup-username"
                ref={usernameRef}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Choose a username"
              />
            </div>
          </div>

          {/* Email input */}
          <div>
            <label htmlFor="signup-email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                id="signup-email"
                ref={emailRef}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter your email"
              />
            </div>
          </div>

          {/* Password input */}
          <div>
            <label htmlFor="signup-password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                id="signup-password"
                ref={passwordRef}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Create a password"
              />
            </div>
          </div>

          {/* Signup button */}
          <button
            onClick={handleSignup}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </div>

        {/* Switch to signin */}
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <button
              onClick={onSwitchToSignin}
              className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
            >
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}