import { useEffect, useRef } from "react";
import { Client, type IMessage } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { WS_BASE_URL } from "@/services/api";
import { useAuthStore } from "@/store/authStore";

export function useUserNotificationsSocket() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const queryClient = useQueryClient();
  const clientRef = useRef<Client | null>(null);

  useEffect(() => {
    if (!isAuthenticated) return;
    const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
    if (!token) return;

    const client = new Client({
      webSocketFactory: () => new SockJS(WS_BASE_URL),
      connectHeaders: { Authorization: `Bearer ${token}` },
      reconnectDelay: 3000,
      onConnect: () => {
        client.subscribe("/user/queue/notifications", (m: IMessage) => {
          try {
            const data = JSON.parse(m.body);
            const type = data?.type;

            if (type === "XP_EARNED") {
              toast(`⭐ +${data.xp ?? data.amount ?? 0} XP earned!`, {
                style: { background: "#1e293b", color: "#fff", border: "1px solid #6366f1" },
              });
            } else if (type === "BADGE_EARNED") {
              toast(`${data.icon ?? "🏅"} Badge unlocked: ${data.name ?? data.badgeName ?? "New badge"}!`, {
                duration: 5000,
                style: { background: "#1e293b", color: "#fff", border: "1px solid #a855f7" },
              });
            } else {
              toast(
                `${data.title ? data.title + ": " : ""}${data.message ?? "You have a new notification"}`,
              );
            }

            queryClient.invalidateQueries({ queryKey: ["notifications", "unread-count"] });
            queryClient.invalidateQueries({ queryKey: ["notifications", "list"] });
          } catch {
            /* ignore */
          }
        });
      },
    });

    client.activate();
    clientRef.current = client;

    return () => {
      client.deactivate();
      clientRef.current = null;
    };
  }, [isAuthenticated, queryClient]);
}
