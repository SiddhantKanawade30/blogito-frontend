const API_BASE_URL = '/api';

// Get auth token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

// Set auth token in localStorage
const setAuthToken = (token) => {
  localStorage.setItem('authToken', token);
};

// Remove auth token from localStorage
const removeAuthToken = () => {
  localStorage.removeItem('authToken');
};

// API request helper
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = getAuthToken();
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  // Add auth token if available and required
  if (token && options.requiresAuth !== false) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Auth API calls
export const authAPI = {
  signup: async (userData) => {
    return apiRequest('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
      requiresAuth: false,
    });
  },

  signin: async (credentials) => {
    const response = await apiRequest('/auth/signin', {
      method: 'POST',
      body: JSON.stringify(credentials),
      requiresAuth: false,
    });
    
    if (response.token) {
      setAuthToken(response.token);
    }
    
    return response;
  },

  verifyEmail: async (token) => {
    return apiRequest(`/auth/verify-email?token=${token}`, {
      method: 'GET',
      requiresAuth: false,
    });
  },

  logout: () => {
    removeAuthToken();
  },
};

// Blog API calls
export const blogAPI = {
  getAllBlogs: async () => {
    return apiRequest('/blogs', {
      method: 'GET',
      requiresAuth: false,
    });
  },

  getMyBlogs: async () => {
    return apiRequest('/blogs/me', {
      method: 'GET',
    });
  },

  getUserBlogs: async (userId) => {
    return apiRequest(`/blogs/user/${userId}`, {
      method: 'GET',
      requiresAuth: false,
    });
  },

  createBlog: async (blogData) => {
    return apiRequest('/blogs', {
      method: 'POST',
      body: JSON.stringify(blogData),
    });
  },
};

// User API calls
export const userAPI = {
  getMyProfile: async () => {
    return apiRequest('/users/me', {
      method: 'GET',
    });
  },

  getUserProfile: async (userId) => {
    return apiRequest(`/users/${userId}`, {
      method: 'GET',
      requiresAuth: false,
    });
  },

  updateProfile: async (userData) => {
    return apiRequest('/users/update', {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  },

  searchUsers: async (query) => {
    return apiRequest(`/users/search?query=${encodeURIComponent(query)}`, {
      method: 'GET',
      requiresAuth: false,
    });
  },
};

export { getAuthToken, setAuthToken, removeAuthToken };