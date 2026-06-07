import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  BookOpen,
  CheckCircle2,
  Flame,
  Star,
  Users,
  Plus,
  Compass,
  Trophy,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { AppNavbar } from "@/components/layout/AppNavbar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuthStore } from "@/store/authStore";
import { analyticsService, type UserAnalytics } from "@/services/analyticsService";
import { roomService, type Room } from "@/services/roomService";
import { notificationService } from "@/services/notificationService";

export const Route = createFileRoute("/dashboard")({
  component: () => (
    <ProtectedRoute>
      <DashboardPage />
    </ProtectedRoute>
  ),
});

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}

function DashboardPage() {
  const user = useAuthStore((s) => s.user);

  const analyticsQ = useQuery({
    queryKey: ["analytics", "me"],
    queryFn: analyticsService.me,
  });
  const roomsQ = useQuery({
    queryKey: ["rooms", "my"],
    queryFn: roomService.myRooms,
  });
  const notifQ = useQuery({
    queryKey: ["notifications", "recent"],
    queryFn: notificationService.recent,
  });

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <AppNavbar />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">
            {greeting()}, {user?.fullName?.split(" ")[0] || user?.username || "friend"} 👋
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Here's a snapshot of your study journey today.
          </p>
        </div>

        <StatsRow query={analyticsQ} />

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <section className="lg:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold">My Study Rooms</h2>
              <Button asChild className="bg-gradient-to-r from-indigo-500 to-violet-500 text-white hover:opacity-90">
                <Link to="/rooms/create">
                  <Plus className="h-4 w-4" />
                  Create Room
                </Link>
              </Button>
            </div>
            <RoomsGrid query={roomsQ} />
          </section>

          <aside className="space-y-6">
            <Card title="Quick Actions">
              <div className="space-y-2">
                <Button asChild variant="outline" className="w-full justify-start border-slate-700 bg-slate-900 text-slate-100 hover:bg-slate-700 hover:text-white">
                  <Link to="/rooms"><Compass className="h-4 w-4" /> Browse Public Rooms</Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start border-slate-700 bg-slate-900 text-slate-100 hover:bg-slate-700 hover:text-white">
                  <Link to="/rooms/create"><Plus className="h-4 w-4" /> Create New Room</Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start border-slate-700 bg-slate-900 text-slate-100 hover:bg-slate-700 hover:text-white">
                  <Link to="/leaderboard"><Trophy className="h-4 w-4" /> View Leaderboard</Link>
                </Button>
              </div>
            </Card>

            <Card title="Recent Activity">
              <RecentActivity query={notifQ} />
            </Card>
          </aside>
        </div>
      </main>
    </div>
  );
}

/* ---------- Stats ---------- */

function StatsRow({ query }: { query: ReturnType<typeof useQuery<UserAnalytics>> }) {
  if (query.isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-28 rounded-xl bg-slate-800" />
        ))}
      </div>
    );
  }
  if (query.isError) {
    return <ErrorBox onRetry={() => query.refetch()} message="Could not load your stats." />;
  }
  const a = query.data!;
  const hours = (a.totalStudyMinutes / 60).toFixed(1);

  const items = [
    { icon: BookOpen, emoji: "📚", label: "Total Study Hours", value: hours },
    { icon: CheckCircle2, emoji: "✅", label: "Sessions Completed", value: a.totalSessions },
    { icon: Flame, emoji: "🔥", label: "Current Streak", value: `${a.currentStreak} days` },
    { icon: Star, emoji: "⭐", label: "XP Points", value: `${a.xpPoints} · Lvl ${a.level}` },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((it) => (
        <div
          key={it.label}
          className="group rounded-xl border border-slate-700 bg-slate-800 p-5 transition-colors hover:border-indigo-500"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-400">{it.label}</span>
            <span className="text-lg">{it.emoji}</span>
          </div>
          <div className="mt-3 flex items-end gap-2">
            <span className="text-2xl font-bold text-white">{it.value}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------- Rooms ---------- */

function RoomsGrid({ query }: { query: ReturnType<typeof useQuery<Room[]>> }) {
  if (query.isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-36 rounded-xl bg-slate-800" />
        ))}
      </div>
    );
  }
  if (query.isError) {
    return <ErrorBox onRetry={() => query.refetch()} message="Could not load your rooms." />;
  }
  const rooms = query.data ?? [];
  if (rooms.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-700 bg-slate-800/50 p-10 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-800">
          <Sparkles className="h-6 w-6 text-indigo-400" />
        </div>
        <h3 className="mt-4 text-lg font-semibold text-white">No rooms yet</h3>
        <p className="mt-1 text-sm text-slate-400">
          Start a focused session with friends or classmates.
        </p>
        <Button asChild className="mt-5 bg-gradient-to-r from-indigo-500 to-violet-500 text-white hover:opacity-90">
          <Link to="/rooms/create"><Plus className="h-4 w-4" /> Create your first room</Link>
        </Button>
      </div>
    );
  }
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {rooms.map((r) => <RoomCard key={r.id} room={r} />)}
    </div>
  );
}

function RoomCard({ room }: { room: Room }) {
  const isActive = room.status === "ACTIVE";
  return (
    <div className="group flex flex-col rounded-xl border border-slate-700 bg-slate-800 p-5 transition-colors hover:border-indigo-500">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-semibold text-white">{room.name}</h3>
        <span className={`flex items-center gap-1.5 text-xs ${isActive ? "text-emerald-400" : "text-slate-500"}`}>
          <span className={`h-2 w-2 rounded-full ${isActive ? "bg-emerald-400 shadow-[0_0_8px] shadow-emerald-400/60" : "bg-slate-500"}`} />
          {isActive ? "Active" : "Idle"}
        </span>
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        {room.subject && (
          <span className="rounded-full bg-indigo-500/15 px-2.5 py-0.5 text-xs font-medium text-indigo-300">
            {room.subject}
          </span>
        )}
        <span className="flex items-center gap-1 text-xs text-slate-400">
          <Users className="h-3.5 w-3.5" />
          {room.currentParticipants ?? 0} members
        </span>
      </div>
      <div className="mt-auto pt-4">
        <Button asChild size="sm" className="w-full bg-indigo-500 text-white hover:bg-indigo-400">
          <Link to="/rooms/$roomId" params={{ roomId: room.id }}>Enter Room</Link>
        </Button>
      </div>
    </div>
  );
}

/* ---------- Sidebar ---------- */

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-800 p-5">
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-400">{title}</h3>
      {children}
    </div>
  );
}

function RecentActivity({ query }: { query: ReturnType<typeof useQuery<Array<{ id: string; message: string; createdAt?: string }>>> }) {
  if (query.isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-12 rounded-md bg-slate-700/60" />
        ))}
      </div>
    );
  }
  if (query.isError) {
    return <p className="text-sm text-slate-400">No recent activity.</p>;
  }
  const items = (query.data ?? []).slice(0, 3);
  if (items.length === 0) {
    return <p className="text-sm text-slate-400">You're all caught up.</p>;
  }
  return (
    <ul className="space-y-3">
      {items.map((n) => (
        <li key={n.id} className="rounded-md border border-slate-700/60 bg-slate-900/40 p-3 text-sm text-slate-200">
          <p className="line-clamp-2">{n.message}</p>
          {n.createdAt && (
            <p className="mt-1 text-xs text-slate-500">{new Date(n.createdAt).toLocaleString()}</p>
          )}
        </li>
      ))}
    </ul>
  );
}

/* ---------- Error ---------- */

function ErrorBox({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-red-500/30 bg-red-500/10 p-4">
      <div className="flex items-center gap-3 text-sm text-red-200">
        <AlertCircle className="h-5 w-5" />
        {message}
      </div>
      <Button size="sm" variant="outline" onClick={onRetry} className="border-red-500/40 bg-transparent text-red-200 hover:bg-red-500/20 hover:text-white">
        Retry
      </Button>
    </div>
  );
}

