/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import type { AppDispatch, RootState } from "@/store";
import { refreshToken } from "@/store/slice/authSlice";

let reduxStore: {
  getState: () => RootState;
  dispatch: AppDispatch;
} | null = null;

export const injectStore = (_store: {
  getState: () => RootState;
  dispatch: AppDispatch;
}) => {
  reduxStore = _store;
};
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  timeout: 0,
  headers: {
    "Content-Type": "application/json",
  },
});

axios.defaults.withCredentials = true; //Gửi cookie qua mỗi request

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

// ✅ Response Interceptor — xử lý lỗi 401, gọi refreshToken
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(axiosInstance(originalRequest));
            },
            reject: (err: any) => reject(err),
          });
        });
      }

      isRefreshing = true;

      try {
        if (!reduxStore) throw new Error("Store not injected");
        const resultAction = await reduxStore?.dispatch(refreshToken());
        const accessToken = resultAction.payload?.accessToken;
        if (accessToken) {
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          processQueue(null, accessToken);
          return axiosInstance(originalRequest);
        } else {
          throw new Error("Refresh token failed");
        }
      } catch (err) {
        processQueue(err, null);
        window.location.href = "/login";
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
