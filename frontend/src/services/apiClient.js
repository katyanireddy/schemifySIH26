import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://schemify-backend.onrender.com';

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    let errorMessage = 'An unexpected error occurred. Please try again.';
    if (error.response) {
      const detail = error.response.data?.detail;
      if (typeof detail === 'string') {
        errorMessage = detail;
      } else if (Array.isArray(detail)) {
        errorMessage = detail.map((d) => d.msg || d.detail || JSON.stringify(d)).join(', ');
      } else if (error.response.status === 422) {
        errorMessage = 'Validation error. Please check your request entries.';
      } else if (error.response.status === 404) {
        errorMessage = 'Requested resource not found on backend.';
      } else if (error.response.status >= 500) {
        errorMessage = 'Server error on backend service. Please try again later.';
      } else {
        errorMessage = error.response.data?.message || `Request failed with code ${error.response.status}`;
      }
    } else if (error.request) {
      errorMessage = 'Unable to connect to SevaSetu backend service. Please check your internet connection.';
    }
    return Promise.reject(new Error(errorMessage));
  }
);

export default apiClient;
