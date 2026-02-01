import axios from 'axios';
import type { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

// Token storage keys
const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

// Create axios instance
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Token management functions
export const tokenManager = {
  getAccessToken: (): string | null => {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  },
  
  getRefreshToken: (): string | null => {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  },
  
  setTokens: (accessToken: string, refreshToken: string): void => {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  },
  
  clearTokens: (): void => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  },
  
  hasTokens: (): boolean => {
    return !!(tokenManager.getAccessToken() && tokenManager.getRefreshToken());
  },
};

// Flag to prevent multiple simultaneous refresh requests
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: any) => void;
  reject: (error?: any) => void;
}> = [];

const processQueue = (error: AxiosError | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  
  failedQueue = [];
};

// Request interceptor - Add access token to requests
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = tokenManager.getAccessToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle token refresh
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    // If error is not 401 or request was already retried, reject
    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    // If already refreshing, queue this request
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then((token) => {
          if (originalRequest.headers && token) {
            originalRequest.headers.Authorization = `Bearer ${token}`;
          }
          return api(originalRequest);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    const refreshToken = tokenManager.getRefreshToken();

    if (!refreshToken) {
      tokenManager.clearTokens();
      processQueue(error, null);
      isRefreshing = false;
      // Redirect to login
      window.location.href = '/login';
      return Promise.reject(error);
    }

    try {
      // Attempt to refresh the token
      const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
        refreshToken,
      });

      const { accessToken, refreshToken: newRefreshToken } = response.data;

      // Update tokens
      tokenManager.setTokens(accessToken, newRefreshToken);

      // Update the original request with new token
      if (originalRequest.headers) {
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
      }

      // Process queued requests
      processQueue(null, accessToken);
      isRefreshing = false;

      // Retry the original request
      return api(originalRequest);
    } catch (refreshError) {
      // Refresh failed, clear tokens and redirect to login
      tokenManager.clearTokens();
      processQueue(refreshError as AxiosError, null);
      isRefreshing = false;
      window.location.href = '/login';
      return Promise.reject(refreshError);
    }
  }
);

// Auth API functions
export const authAPI = {
  /**
   * Login should NOT go through the shared axios instance / middleware.
   * This avoids attaching stale Authorization headers or triggering refresh logic.
   */
  login: async (email: string, password: string) => {
    const url = `${API_BASE_URL}/auth/login/json`;
    console.log('AuthAPI.login → calling raw axios:', { url, email });

    try {
      const response = await axios.post(
        url,
        { email, password },
        {
          headers: {
            'Content-Type': 'application/json',
            accept: 'application/json',
          },
          // Explicitly disable sending credentials / cookies unless your API needs them
          withCredentials: false,
        },
      );

      const data = response.data;
      console.log('AuthAPI.login → response data:', data);

      // Support both snake_case and camelCase token formats
      const accessToken = data.access_token || data.accessToken;
      const refreshToken = data.refresh_token || data.refreshToken;

      if (accessToken && refreshToken) {
        tokenManager.setTokens(accessToken, refreshToken);
        console.log('AuthAPI.login → tokens stored');
      } else {
        console.warn('AuthAPI.login → tokens not found in response; skipping storage');
      }

      return data;
    } catch (error: any) {
      console.error('AuthAPI.login → error:', error);
      console.error('AuthAPI.login → error.response:', error?.response);
      throw error;
    }
  },

  logout: async () => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      tokenManager.clearTokens();
    }
  },

  register: async (username: string, email: string, password: string) => {
    const response = await api.post('/auth/register', {
      username,
      email,
      password,
    });
    const { accessToken, refreshToken } = response.data;
    tokenManager.setTokens(accessToken, refreshToken);
    return response.data;
  },

  forgotPassword: async (email: string) => {
    return await api.post('/auth/forgot-password', { email });
  },

  resetPassword: async (token: string, newPassword: string) => {
    return await api.post('/auth/reset-password', { token, newPassword });
  },

  getCurrentUser: async () => {
    return await api.get('/auth/me');
  },
};

// Social login functions
export const socialAuthAPI = {
  google: async () => {
    // Redirect to Google OAuth or handle popup
    window.location.href = `${API_BASE_URL}/auth/google`;
  },

  facebook: async () => {
    window.location.href = `${API_BASE_URL}/auth/facebook`;
  },

  apple: async () => {
    window.location.href = `${API_BASE_URL}/auth/apple`;
  },
};

export default api;
