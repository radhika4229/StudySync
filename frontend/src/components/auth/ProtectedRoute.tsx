import { useEffect, type ReactNode } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useAuthStore } from "@/store/authStore";
import { FullPageSpinner } from "@/components/ui/spinner";
import { useUserNotificationsSocket } from "@/hooks/useUserNotificationsSocket";

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuthStore();
  useUserNotificationsSocket();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate({ to: "/login" });
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading || !isAuthenticated) {
    return <FullPageSpinner />;
  }
  return <div className="animate-in fade-in duration-300">{children}</div>;
}
