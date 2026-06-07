import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
}

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  setAuth: (user: AuthUser, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      setAuth: (user, token) => {
        if (typeof window !== "undefined") localStorage.setItem("auth_token", token);
        set({ user, token });
      },
      logout: () => {
        if (typeof window !== "undefined") localStorage.removeItem("auth_token");
        set({ user: null, token: null });
      },
    }),
    { name: "collabstudy-auth" }
  )
);
