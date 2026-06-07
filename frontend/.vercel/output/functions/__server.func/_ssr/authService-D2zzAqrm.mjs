import { a as api } from "./router-Bov4sYtq.mjs";
const authService = {
  login: async (email, password) => {
    const response = await api.post("/auth/login", {
      email,
      password
    });
    return response.data.data;
  },
  register: async (username, email, password, fullName) => {
    const response = await api.post("/auth/register", {
      username,
      email,
      password,
      fullName
    });
    return response.data.data;
  },
  logout: async () => {
    await api.post("/auth/logout");
  },
  refreshToken: async (token) => {
    const response = await api.post(
      `/auth/refresh?refreshToken=${encodeURIComponent(token)}`
    );
    return response.data.data;
  },
  getCurrentUser: async () => {
    const response = await api.get("/auth/me");
    return response.data.data;
  }
};
export {
  authService as a
};
