// src/utils/axiosInstance.js
import { getAuthToken, getRefreshToken, setAuthToken, removeAuthToken, removeRefreshToken } from '@/hooks/CookiesUtils';
import axios from 'axios';
import store from '@/store/store';
import { logoutAction } from '@/store/user/user.reducer';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

let isRefreshing = false;
let refreshSubscribers = [];

// Subscribe failed requests while refresh is in progress
const subscribeTokenRefresh = (callback) => {
  refreshSubscribers.push(callback);
};

// Notify subscribers when refresh completes
const onRefreshed = (newToken) => {
  refreshSubscribers.forEach((cb) => cb(newToken));
  refreshSubscribers = [];
};

// Request interceptor: attach latest token from cookies
axiosInstance.interceptors.request.use(
  (config) => {
    // Allow opting out of auth for public endpoints
    const shouldSkipAuth = Boolean(config.skipAuth);
    if (shouldSkipAuth) {
      if (config.headers && 'Authorization' in config.headers) {
        delete config.headers.Authorization;
      }
      return config;
    }

    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else if (config.headers) {
      delete config.headers.Authorization;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: handle 401 / token refresh
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config || {};

    // Do not attempt refresh for public endpoints
    if (originalRequest.skipAuth) {
      return Promise.reject(error);
    }

    // Only retry once per request
    if (
      error.response &&
      ([403].includes(error.response.status) ||
        error.response.data?.message === 'Invalid or expired token') &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const refreshToken = typeof getRefreshToken === 'function' ? getRefreshToken() : undefined;
      if (!refreshToken) {
        if (typeof removeAuthToken === 'function') removeAuthToken();
        if (typeof removeRefreshToken === 'function') removeRefreshToken();
        try { store.dispatch(logoutAction()); } catch (_) {}
        window.location.href = '/login';
        return Promise.reject(error);
      }

      // If refresh is already in progress, queue this request
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          subscribeTokenRefresh((newToken) => {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            resolve(axiosInstance(originalRequest));
          });
        });
      }

      // Start token refresh
      isRefreshing = true;

      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_AUTH_API_URL}/v1/auth/refresh-token`,
          { headers: { Authorization: `Bearer ${refreshToken}` } }
        );

        const { accessToken, refreshToken } = data.data;

        // Save new tokens in cookies
        if (typeof setAuthToken === 'function') setAuthToken(accessToken);

        // Update axios default header
        axiosInstance.defaults.headers.Authorization = `Bearer ${accessToken}`;

        isRefreshing = false;

        // Retry the original failed request immediately
        const result = await axiosInstance(originalRequest);

        // Notify queued requests (if any)
        onRefreshed(accessToken);

        return result;
      } catch (refreshError) {
        isRefreshing = false;
        if (typeof removeAuthToken === 'function') removeAuthToken();
        if (typeof removeRefreshToken === 'function') removeRefreshToken();
        try { store.dispatch(logoutAction()); } catch (_) {}
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
