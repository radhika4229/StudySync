import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { u as useAuthStore, W as WS_BASE_URL } from "./router-Bov4sYtq.mjs";
import { c as cn } from "./button-BXrfXN_b.mjs";
import { S as SockJS } from "../_libs/sockjs-client.mjs";
import { z as zt } from "../_libs/react-hot-toast.mjs";
import { a as useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { C as Client } from "../_libs/stomp__stompjs.mjs";
import { L as LoaderCircle } from "../_libs/lucide-react.mjs";
function Spinner({ className, size = 24 }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    LoaderCircle,
    {
      className: cn("animate-spin text-indigo-500", className),
      style: { width: size, height: size }
    }
  );
}
function FullPageSpinner() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-slate-900", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Spinner, { size: 36 }) });
}
function useUserNotificationsSocket() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const queryClient = useQueryClient();
  const clientRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (!isAuthenticated) return;
    const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
    if (!token) return;
    const client = new Client({
      webSocketFactory: () => new SockJS(WS_BASE_URL),
      connectHeaders: { Authorization: `Bearer ${token}` },
      reconnectDelay: 3e3,
      onConnect: () => {
        client.subscribe("/user/queue/notifications", (m) => {
          try {
            const data = JSON.parse(m.body);
            const type = data?.type;
            if (type === "XP_EARNED") {
              zt(`⭐ +${data.xp ?? data.amount ?? 0} XP earned!`, {
                style: { background: "#1e293b", color: "#fff", border: "1px solid #6366f1" }
              });
            } else if (type === "BADGE_EARNED") {
              zt(`${data.icon ?? "🏅"} Badge unlocked: ${data.name ?? data.badgeName ?? "New badge"}!`, {
                duration: 5e3,
                style: { background: "#1e293b", color: "#fff", border: "1px solid #a855f7" }
              });
            } else {
              zt(
                `${data.title ? data.title + ": " : ""}${data.message ?? "You have a new notification"}`
              );
            }
            queryClient.invalidateQueries({ queryKey: ["notifications", "unread-count"] });
            queryClient.invalidateQueries({ queryKey: ["notifications", "list"] });
          } catch {
          }
        });
      }
    });
    client.activate();
    clientRef.current = client;
    return () => {
      client.deactivate();
      clientRef.current = null;
    };
  }, [isAuthenticated, queryClient]);
}
function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuthStore();
  useUserNotificationsSocket();
  reactExports.useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate({ to: "/login" });
    }
  }, [isAuthenticated, isLoading, navigate]);
  if (isLoading || !isAuthenticated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(FullPageSpinner, {});
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-in fade-in duration-300", children });
}
export {
  ProtectedRoute as P
};
