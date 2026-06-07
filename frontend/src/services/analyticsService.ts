import { api } from "./api";

export interface UserAnalytics {
  totalStudyMinutes: number;
  totalSessions: number;
  currentStreak: number;
  longestStreak?: number;
  xpPoints: number;
  level: number;
  roomsJoined?: number;
  badges?: Array<{ code: string; name?: string; earnedAt?: string }>;
  recentSessions?: Array<{ roomName?: string; durationMinutes?: number; startedAt?: string }>;
}

const unwrap = <T,>(data: any): T => (data?.data !== undefined ? data.data : data);

export const analyticsService = {
  me: async (): Promise<UserAnalytics> => {
    const { data } = await api.get("/analytics/me");
    return unwrap<UserAnalytics>(data);
  },
};
