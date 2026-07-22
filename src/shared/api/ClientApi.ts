// const BASE_URL = import.meta.env.VITE_API_URL;

import axios, { AxiosError } from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// ==================== Request Interceptor ====================

axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ==================== Response Interceptor ====================

axiosClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          localStorage.removeItem("token");
          break;
        case 403:
          console.error("Forbidden");
          break;

        case 404:
          console.error("Resource Not Found");
          break;

        case 422:
          console.error("Validation Error");
          break;

        case 500:
          console.error("Internal Server Error");
          break;

        default:
          console.error("Unexpected Error");
      }
    } else {
      console.error("Network Error");
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
