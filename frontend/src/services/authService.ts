import { api } from "./api";

export interface AuthUser {
  id: string;
  username: string;
  email: string;
  fullName?: string;
  avatarUrl?: string;
  [key: string]: unknown;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: AuthUser;
}

export const authService = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await api.post("/auth/login", {
      email,
      password,
    });

    // Backend returns:
    // {
    //   success: true,
    //   message: "...",
    //   data: { accessToken, refreshToken, user }
    // }

    return response.data.data;
  },

  register: async (
      username: string,
      email: string,
      password: string,
      fullName: string
  ): Promise<AuthResponse> => {
    const response = await api.post("/auth/register", {
      username,
      email,
      password,
      fullName,
    });

    return response.data.data;
  },

  logout: async (): Promise<void> => {
    await api.post("/auth/logout");
  },

  refreshToken: async (token: string): Promise<AuthResponse> => {
    const response = await api.post(
        `/auth/refresh?refreshToken=${encodeURIComponent(token)}`
    );

    return response.data.data;
  },

  getCurrentUser: async (): Promise<AuthUser> => {
    const response = await api.get("/auth/me");

    // Check your backend response structure.
    // If /auth/me also returns { success, message, data }
    return response.data.data;

    // Otherwise use:
    // return response.data;
  },
};