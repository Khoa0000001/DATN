// src/utils/axiosInstance.ts
import axios from "axios";
import type { RootState } from "@/store";

let reduxStore: { getState: () => RootState } | null = null;

export const injectStore = (_store: { getState: () => RootState }) => {
  reduxStore = _store;
};

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Request Interceptor — tự động gắn token
axiosInstance.interceptors.request.use(
  (config) => {
    if (reduxStore) {
      const token = reduxStore.getState().auth.accessToken;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Response Interceptor — xử lý lỗi chung
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    if (status === 401) {
      console.warn("Token hết hạn hoặc không hợp lệ");
    } else if (status === 403) {
      console.warn("Không có quyền truy cập");
    } else if (status >= 500) {
      console.error("Lỗi server");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
