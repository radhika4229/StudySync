import { create } from "zustand";
import type { AuthUser } from "@/services/authService";

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: AuthUser | null) => void;
  setToken: (token: string | null) => void;
  logout: () => void;
  initialize: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
  setUser: (user) => {
    if (typeof window !== "undefined") {
      if (user) localStorage.setItem("user", JSON.stringify(user));
      else localStorage.removeItem("user");
    }
    set((s) => ({ user, isAuthenticated: !!user && !!s.token }));
  },
  setToken: (token) => {
    if (typeof window !== "undefined") {
      if (token) localStorage.setItem("access_token", token);
      else localStorage.removeItem("access_token");
    }
    set((s) => ({ token, isAuthenticated: !!token && !!s.user }));
  },
  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user");
    }
    set({ user: null, token: null, isAuthenticated: false, isLoading: false });
  },
  initialize: () => {
    if (typeof window === "undefined") {
      set({ isLoading: false });
      return;
    }
    const token = localStorage.getItem("access_token");
    const userStr = localStorage.getItem("user");
    let user: AuthUser | null = null;
    try {
      user = userStr ? (JSON.parse(userStr) as AuthUser) : null;
    } catch {
      user = null;
    }
    set({
      token,
      user,
      isAuthenticated: !!token && !!user,
      isLoading: false,
    });
  },
}));
