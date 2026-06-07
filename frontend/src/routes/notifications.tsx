import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { AppNavbar } from "@/components/layout/AppNavbar";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { BellOff, CheckCheck } from "lucide-react";
import { notificationService, type Notification } from "@/services/notificationService";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/notifications")({
  component: () => (
    <ProtectedRoute>
      <NotificationsPage />
    </ProtectedRoute>
  ),
});

const TYPE_ICONS: Record<string, string> = {
  SESSION_START: "🚀",
  BADGE_EARNED: "🏅",
  XP_EARNED: "⭐",
  FRIEND_JOINED: "🤝",
  TASK_ASSIGNED: "✅",
};

function NotificationsPage() {
  const qc = useQueryClient();
  const { data: notifications = [], isLoading } = useQuery({
    queryKey: ["notifications", "list"],
    queryFn: notificationService.list,
  });

  const sorted = [...notifications].sort((a, b) => {
    const ta = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const tb = b.createdAt ? new Date(b.createdAt).getTime() : 0;
    return tb - ta;
  });

  const markRead = useMutation({
    mutationFn: (id: string) => notificationService.markRead(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["notifications"] });
    },
  });

  const markAll = useMutation({
    mutationFn: notificationService.markAllRead,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["notifications"] });
    },
  });

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <AppNavbar />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <header className="flex items-center justify-between mb-6 gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Notifications</h1>
            <p className="text-slate-400 text-sm">Stay up to date with your study activity.</p>
          </div>
          <Button
            variant="outline"
            className="border-slate-700 bg-slate-800 text-slate-100 hover:bg-slate-700"
            onClick={() => markAll.mutate()}
            disabled={markAll.isPending || sorted.every((n) => n.read)}
          >
            <CheckCheck className="w-4 h-4 mr-2" /> Mark all read
          </Button>
        </header>

        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-20 bg-slate-800" />
            ))}
          </div>
        ) : sorted.length === 0 ? (
          <Card className="bg-slate-800 border-slate-700 text-center py-16">
            <div className="flex flex-col items-center gap-3 text-slate-400">
              <BellOff className="w-12 h-12 text-slate-600" />
              <p className="text-lg font-medium text-slate-200">You're all caught up!</p>
              <p className="text-sm">New notifications will show up here.</p>
            </div>
          </Card>
        ) : (
          <ul className="space-y-2">
            {sorted.map((n) => (
              <NotificationRow
                key={n.id}
                n={n}
                onClick={() => {
                  if (!n.read) markRead.mutate(n.id);
                }}
              />
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}

function NotificationRow({ n, onClick }: { n: Notification; onClick: () => void }) {
  const icon = TYPE_ICONS[n.type as string] ?? "🔔";
  const time = n.createdAt
    ? formatDistanceToNow(new Date(n.createdAt), { addSuffix: true })
    : "";
  return (
    <li>
      <button
        onClick={onClick}
        className={cn(
          "w-full text-left rounded-lg p-4 border transition-all flex gap-3 items-start hover:scale-[1.01]",
          n.read
            ? "bg-slate-800 border-slate-700 opacity-70"
            : "bg-slate-700 border-l-4 border-l-indigo-500 border-slate-600",
        )}
      >
        <div className="text-2xl flex-shrink-0">{icon}</div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-slate-100 truncate">
            {n.title || (n.type as string) || "Notification"}
          </p>
          <p className="text-sm text-slate-300 mt-0.5 break-words">{n.message}</p>
          {time && <p className="text-xs text-slate-500 mt-1">{time}</p>}
        </div>
        {!n.read && (
          <span className="w-2 h-2 rounded-full bg-indigo-400 mt-2 flex-shrink-0" />
        )}
      </button>
    </li>
  );
}
