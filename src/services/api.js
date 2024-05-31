
/*
import axios from 'axios';

// Configuration for the API endpoint
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Axios instance to handle the timeout and base URL configuration
const api = axios.create({
  baseURL: API_URL,
  timeout: 5000 // Set a timeout of 5 seconds for all requests
});

// Response interceptor to handle different status codes
api.interceptors.response.use(response => {
  return response;
}, error => {
  if (error.response) {
    // Differentiate error message based on status code here if needed
    if (error.response.status === 400) {
      throw new Error('Validation error, please check your input.');
    } else if (error.response.status === 500) {
      throw new Error('Server error, please try again later.');
    } else if (!error.response.status) {
      throw new Error('Network error, please check your connection.');
    }
    // Fallback error message
    throw new Error(error.response.data.message || 'An unknown error occurred.');
  } else {
    throw new Error('Network error, please check your connection.');
  }
});

// Function to handle user signup
export const signup = async (userData) => {
  try {
    const response = await api.post('src/components/Signup.js', userData);
    return response.data;
  } catch (error) {
    throw error; // This will be a custom Error from the interceptor
  }
};

// Function to handle user login
export const login = async (userData) => {
  try {
    const response = await api.post('/login', userData);
    return response.data;
  } catch (error) {
    throw error; // This will be a custom Error from the interceptor
  }
};
*/