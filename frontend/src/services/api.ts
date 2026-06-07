import axios, { AxiosError, type AxiosRequestConfig } from "axios";

export const API_BASE_URL =
  (import.meta as any).env?.VITE_API_BASE_URL || "http://localhost:8080/api";
export const WS_BASE_URL =
  (import.meta as any).env?.VITE_WS_BASE_URL ||
  API_BASE_URL.replace(/\/api\/?$/, "/ws");

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("access_token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ---- 401 → refresh token flow ----
let isRefreshing = false;
let pendingQueue: Array<(token: string | null) => void> = [];

const flushQueue = (token: string | null) => {
  pendingQueue.forEach((cb) => cb(token));
  pendingQueue = [];
};

const forceLogout = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("user");
  if (!window.location.pathname.startsWith("/login")) {
    window.location.href = "/login";
  }
};

api.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const original = error.config as AxiosRequestConfig & { _retry?: boolean };
    const status = error.response?.status;

    if (
      status !== 401 ||
      !original ||
      original._retry ||
      typeof window === "undefined" ||
      (original.url || "").includes("/auth/refresh") ||
      (original.url || "").includes("/auth/login")
    ) {
      if (status === 401 && typeof window !== "undefined") forceLogout();
      return Promise.reject(error);
    }

    const refreshToken = localStorage.getItem("refresh_token");
    if (!refreshToken) {
      forceLogout();
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        pendingQueue.push((token) => {
          if (!token) return reject(error);
          original._retry = true;
          original.headers = { ...(original.headers || {}), Authorization: `Bearer ${token}` };
          resolve(api(original));
        });
      });
    }

    original._retry = true;
    isRefreshing = true;
    try {
      const { data } = await axios.post(
        `${API_BASE_URL}/auth/refresh`,
        null,
        { params: { refreshToken } }
      );
      const newToken = data?.accessToken;
      const newRefresh = data?.refreshToken;
      if (!newToken) throw new Error("No accessToken in refresh response");
      localStorage.setItem("access_token", newToken);
      if (newRefresh) localStorage.setItem("refresh_token", newRefresh);
      flushQueue(newToken);
      original.headers = { ...(original.headers || {}), Authorization: `Bearer ${newToken}` };
      return api(original);
    } catch (e) {
      flushQueue(null);
      forceLogout();
      return Promise.reject(e);
    } finally {
      isRefreshing = false;
    }
  }
);

export default api;
