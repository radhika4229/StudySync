import { a as api } from "./router-Bov4sYtq.mjs";
const roomService = {
  myRooms: async () => {
    const response = await api.get("/rooms/my");
    return response.data?.data ?? [];
  },
  publicRooms: async () => {
    const response = await api.get("/rooms");
    return response.data?.data ?? [];
  },
  recommend: async (subject) => {
    const response = await api.get("/rooms/recommend", {
      params: { subject }
    });
    return response.data?.data ?? [];
  },
  join: async (roomCode, password) => {
    const response = await api.post(
      `/rooms/${encodeURIComponent(roomCode)}/join`,
      null,
      {
        params: password ? { password } : void 0
      }
    );
    return response.data?.data;
  },
  create: async (payload) => {
    const response = await api.post("/rooms", payload);
    return response.data?.data;
  }
};
const SUBJECTS = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Computer Science",
  "Biology",
  "History",
  "Literature",
  "Economics",
  "Languages",
  "Other"
];
export {
  SUBJECTS as S,
  roomService as r
};
