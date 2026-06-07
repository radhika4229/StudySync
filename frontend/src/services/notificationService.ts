import { api } from "./api";

export type NotificationType =
  | "SESSION_START"
  | "BADGE_EARNED"
  | "XP_EARNED"
  | "FRIEND_JOINED"
  | "TASK_ASSIGNED"
  | "NOTIFICATION"
  | string;

export interface Notification {
  id: string;
  type?: NotificationType;
  title?: string;
  message: string;
  read?: boolean;
  createdAt?: string;
  [k: string]: unknown;
}

const unwrap = <T,>(data: any): T => (data?.data !== undefined ? data.data : data);

export const notificationService = {
  unreadCount: async (): Promise<number> => {
    const { data } = await api.get("/notifications/unread-count");
    const out = unwrap<any>(data);
    return typeof out === "number" ? out : (out?.count ?? 0);
  },
  list: async (): Promise<Notification[]> => {
    const { data } = await api.get("/notifications");
    const out = unwrap<any>(data);
    return Array.isArray(out) ? out : (out?.items ?? []);
  },
  recent: async (): Promise<Notification[]> => {
    const { data } = await api.get("/notifications");
    const out = unwrap<any>(data);
    return Array.isArray(out) ? out : (out?.items ?? []);
  },
  markRead: async (id: string): Promise<void> => {
    await api.put(`/notifications/${id}/read`);
  },
  markAllRead: async (): Promise<void> => {
    await api.put(`/notifications/read-all`);
  },
};
