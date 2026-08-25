import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://dummyjson.com';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to mock endpoints and handle generic errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Mock the /forgot-password endpoint since DummyJSON doesn't have one
    if (error.config && error.config.url === '/auth/forgot-password') {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ data: { message: 'Password reset link sent to your email.' } });
        }, 1500); // simulate network delay
      });
    }
    
    // Handle specific status codes globally if needed
    if (error.response && error.response.status === 401) {
      // e.g., clear token if it's expired
      // localStorage.removeItem('token');
    }

    if (error.config && error.config.url === '/auth/register') {
      return new Promise((resolve) => {
        setTimeout(() => {
          // Mock successful registration and return fake token/user
          resolve({
            data: {
              token: 'mock-jwt-token-from-register',
              user: {
                id: Math.floor(Math.random() * 1000),
                username: JSON.parse(error.config.data).username || 'newuser',
                email: JSON.parse(error.config.data).email,
                firstName: JSON.parse(error.config.data).firstName || 'New',
                lastName: JSON.parse(error.config.data).lastName || 'User',
              }
            }
          });
        }, 1500); // simulate network delay
      });
    }

    return Promise.reject(error);
  }
);

export default apiClient;
