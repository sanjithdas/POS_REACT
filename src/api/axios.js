import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost/api",
  headers: {
    Accept: "application/json",
  },
});

// Attach Authorization token dynamically before every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Get token from storage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
