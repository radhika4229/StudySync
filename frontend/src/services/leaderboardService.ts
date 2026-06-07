import { api } from "./api";

export type LeaderboardType = "xp" | "streak";

export interface LeaderboardEntry {
  rank?: number;
  userId: string;
  username: string;
  fullName?: string;
  avatarUrl?: string;
  level?: number;
  xpPoints?: number;
  currentStreak?: number;
  totalStudyMinutes?: number;
}

const unwrap = <T,>(data: any): T => (data?.data !== undefined ? data.data : data);

export const leaderboardService = {
  list: async (type: LeaderboardType, limit = 20): Promise<LeaderboardEntry[]> => {
    const { data } = await api.get(`/leaderboard`, { params: { type, limit } });
    const out = unwrap<any>(data);
    const arr: LeaderboardEntry[] = Array.isArray(out) ? out : [];
    return arr.map((e, i) => ({ ...e, rank: e.rank ?? i + 1 }));
  },
};
