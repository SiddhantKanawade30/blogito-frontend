// This file handles all communication with the backend server
// Made simple and easy to understand for beginners!

// Where our backend server is running
const API_BASE_URL = '/api';

// Functions to manage the login token in browser storage
export const getAuthToken = () => {
  // Get the saved login token from browser storage
  return localStorage.getItem('authToken');
};

export const setAuthToken = (token) => {
  // Save the login token to browser storage
  localStorage.setItem('authToken', token);
};

export const removeAuthToken = () => {
  // Remove the login token from browser storage (for logout)
  localStorage.removeItem('authToken');
};

// Helper function to make requests to our backend
const makeAPIRequest = async (url, options = {}) => {
  try {
    console.log(`🌐 Making API request to: ${API_BASE_URL}${url}`);
    
    // Get the saved login token
    const token = getAuthToken();
    
    // Prepare the request settings
    const requestSettings = {
      headers: {
        'Content-Type': 'application/json', // Tell server we're sending JSON
      },
      ...options, // Add any extra settings passed to this function
    };

    // If user is logged in, add their token to the request
    if (token && options.needsLogin !== false) {
      requestSettings.headers.Authorization = `Bearer ${token}`;
      console.log('🔑 Adding auth token to request');
    }

    console.log('📤 Request settings:', {
      url: `${API_BASE_URL}${url}`,
      method: requestSettings.method || 'GET',
      hasAuth: !!requestSettings.headers.Authorization,
      body: requestSettings.body ? 'Present' : 'None'
    });

    // Make the actual request to the server
    const response = await fetch(`${API_BASE_URL}${url}`, requestSettings);
    
    console.log('📥 Response status:', response.status, response.statusText);

    // Check if response is ok first
    if (!response.ok) {
      // Try to get error message from response
      let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
      
      try {
        // Try to parse as JSON first
        const errorData = await response.json();
        errorMessage = errorData.message || errorData.error || errorMessage;
      } catch (parseError) {
        // If JSON parsing fails, try to get text
        try {
          const errorText = await response.text();
          if (errorText && !errorText.includes('<!DOCTYPE')) {
            errorMessage = errorText;
          }
        } catch (textError) {
          console.error('Could not parse error response:', textError);
        }
      }
      
      console.error('❌ API Error:', errorMessage);
      throw new Error(errorMessage);
    }

    // Try to parse response as JSON
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      console.log('✅ API Success:', data);
      return data;
    } else {
      // If not JSON, get as text
      const text = await response.text();
      console.log('✅ API Success (text):', text);
      return { message: text };
    }

  } catch (error) {
    console.error('🚨 API Request Failed:', error.message);
    
    // Provide user-friendly error messages
    if (error.message.includes('Failed to fetch')) {
      throw new Error('Cannot connect to server. Make sure your backend is running on port 5000.');
    } else if (error.message.includes('<!DOCTYPE')) {
      throw new Error('Server returned HTML instead of data. Check if backend is running correctly.');
    } else {
      throw error; // Pass the original error
    }
  }
};

// Authentication functions (signup, login, etc.)
export const authAPI = {
  // Create a new user account
  signup: async (username, email, password) => {
    console.log('👤 Signing up user:', { username, email });
    
    // Prepare the data exactly as backend expects
    const signupData = {
      username: username,
      email: email,
      password: password
    };

    console.log('📤 Sending signup data:', signupData);

    return makeAPIRequest('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(signupData),
      needsLogin: false, // Don't need to be logged in to signup
    });
  },

  // Log in an existing user
  signin: async (email, password) => {
    console.log('🔐 Signing in user:', { email });
    
    // Prepare the data exactly as backend expects
    const signinData = {
      email: email,
      password: password
    };

    console.log('📤 Sending signin data:', signinData);

    const response = await makeAPIRequest('/auth/signin', {
      method: 'POST',
      body: JSON.stringify(signinData),
      needsLogin: false, // Don't need to be logged in to signin
    });
    
    // If login successful, save the token
    if (response.token) {
      console.log('🎉 Login successful! Saving token...');
      setAuthToken(response.token);
    }
    
    return response;
  },

  // Verify user's email address
  verifyEmail: async (token) => {
    console.log('📧 Verifying email with token:', token);
    return makeAPIRequest(`/auth/verify-email?token=${token}`, {
      method: 'GET',
      needsLogin: false, // Don't need to be logged in to verify email
    });
  },

  // Log out the user
  logout: () => {
    console.log('👋 Logging out user...');
    removeAuthToken(); // Just remove the token from storage
  },
};

// Blog-related functions
export const blogAPI = {
  // Get all blog posts (public, anyone can see)
  getAllBlogs: async () => {
    console.log('📚 Getting all blogs...');
    return makeAPIRequest('/blogs', {
      method: 'GET',
      needsLogin: false, // Anyone can read blogs
    });
  },

  // Get only the current user's blog posts
  getMyBlogs: async () => {
    console.log('📝 Getting my blogs...');
    return makeAPIRequest('/blogs/me', {
      method: 'GET',
      // needsLogin: true (default)
    });
  },

  // Get blog posts from a specific user
  getUserBlogs: async (userId) => {
    console.log('👤 Getting blogs for user:', userId);
    return makeAPIRequest(`/blogs/user/${userId}`, {
      method: 'GET',
      needsLogin: false, // Anyone can read user's blogs
    });
  },

  // Create a new blog post
  createBlog: async (title, content, tags) => {
    console.log('✍️ Creating new blog:', { title, content, tags });
    
    const blogData = {
      title: title,
      content: content,
      tags: tags
    };

    return makeAPIRequest('/blogs', {
      method: 'POST',
      body: JSON.stringify(blogData),
      // needsLogin: true (default) - must be logged in to create blogs
    });
  },
};

// User profile functions
export const userAPI = {
  // Get current user's profile information
  getMyProfile: async () => {
    console.log('👤 Getting my profile...');
    return makeAPIRequest('/users/me', {
      method: 'GET',
      // needsLogin: true (default)
    });
  },

  // Get any user's public profile
  getUserProfile: async (userId) => {
    console.log('👤 Getting user profile:', userId);
    return makeAPIRequest(`/users/${userId}`, {
      method: 'GET',
      needsLogin: false, // Anyone can view public profiles
    });
  },

  // Update current user's profile
  updateProfile: async (userData) => {
    console.log('📝 Updating profile with:', userData);
    return makeAPIRequest('/users/update', {
      method: 'PUT',
      body: JSON.stringify(userData),
      // needsLogin: true (default)
    });
  },

  // Search for users by name or email
  searchUsers: async (searchText) => {
    console.log('🔍 Searching users:', searchText);
    return makeAPIRequest(`/users/search?query=${encodeURIComponent(searchText)}`, {
      method: 'GET',
      needsLogin: false, // Anyone can search users
    });
  },
};