import { a as api } from "./router-Bov4sYtq.mjs";
const unwrap = (data) => data?.data !== void 0 ? data.data : data;
const analyticsService = {
  me: async () => {
    const { data } = await api.get("/analytics/me");
    return unwrap(data);
  }
};
export {
  analyticsService as a
};
