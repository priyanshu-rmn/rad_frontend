import axios from 'axios';

// const BACKEND_URL = 'https://e78ee7df-8847-4452-bd42-7b77577e8c2d.mock.pstmn.io';
const BACKEND_URL = 'http://localhost:8000';

export const api = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

// Add a request interceptor to include the Bearer token
api.interceptors.request.use(
  (config) => {
    // Retrieve the token from localStorage
    const token = localStorage.getItem('jwtToken');

    // If a token exists, add it to the Authorization header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config; // Return the updated config
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);