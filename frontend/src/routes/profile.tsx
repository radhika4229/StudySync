import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { AppNavbar } from "@/components/layout/AppNavbar";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { Lock, Clock, Flame, Trophy, Users, Target, Zap, Calendar } from "lucide-react";
import { analyticsService } from "@/services/analyticsService";
import { authService } from "@/services/authService";
import { format } from "date-fns";

export const Route = createFileRoute("/profile")({
  component: () => (
    <ProtectedRoute>
      <ProfilePage />
    </ProtectedRoute>
  ),
});

const ALL_BADGES: Array<{ code: string; icon: string; name: string; description: string }> = [
  { code: "FIRST_SESSION", icon: "🎯", name: "First Steps", description: "Complete your first study session" },
  { code: "STREAK_3", icon: "🔥", name: "On Fire", description: "Maintain a 3-day study streak" },
  { code: "STREAK_7", icon: "⚡", name: "Week Warrior", description: "Maintain a 7-day study streak" },
  { code: "STREAK_30", icon: "🏆", name: "Unstoppable", description: "Maintain a 30-day streak" },
  { code: "HOURS_10", icon: "⏰", name: "Dedicated", description: "Study for 10 total hours" },
  { code: "HOURS_50", icon: "📚", name: "Scholar", description: "Study for 50 total hours" },
  { code: "HOURS_100", icon: "🎓", name: "Master", description: "Study for 100 total hours" },
  { code: "ROOMS_5", icon: "🤝", name: "Collaborator", description: "Join 5 different rooms" },
  { code: "LEVEL_5", icon: "⭐", name: "Rising Star", description: "Reach level 5" },
  { code: "LEVEL_10", icon: "🌟", name: "Elite", description: "Reach level 10" },
];

function initials(name?: string, fallback?: string) {
  const s = (name || fallback || "?").trim();
  const parts = s.split(/\s+/);
  return ((parts[0]?.[0] || "") + (parts[1]?.[0] || "")).toUpperCase() || s[0]?.toUpperCase() || "?";
}

function ProfilePage() {
  const { data: user } = useQuery({ queryKey: ["auth", "me"], queryFn: authService.getCurrentUser });
  const { data: stats, isLoading } = useQuery({
    queryKey: ["analytics", "me"],
    queryFn: analyticsService.me,
  });

  const level = stats?.level ?? 1;
  const xp = stats?.xpPoints ?? 0;
  const nextLevelXP = level * 200;
  const prevLevelXP = (level - 1) * 200;
  const progressInLevel = Math.max(0, xp - prevLevelXP);
  const levelSpan = Math.max(1, nextLevelXP - prevLevelXP);
  const pct = Math.min(100, Math.round((progressInLevel / levelSpan) * 100));

  const earnedBadges = new Map(
    (stats?.badges || []).map((b) => [b.code, b])
  );

  const totalHours = ((stats?.totalStudyMinutes ?? 0) / 60).toFixed(1);

  const statCards = [
    { icon: Clock, label: "Study Hours", value: totalHours },
    { icon: Target, label: "Sessions", value: stats?.totalSessions ?? 0 },
    { icon: Flame, label: "Current Streak", value: `${stats?.currentStreak ?? 0}d` },
    { icon: Trophy, label: "Longest Streak", value: `${stats?.longestStreak ?? 0}d` },
    { icon: Zap, label: "XP Points", value: stats?.xpPoints ?? 0 },
    { icon: Users, label: "Rooms Joined", value: stats?.roomsJoined ?? 0 },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <AppNavbar />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Profile header */}
        <Card className="bg-slate-800 border-slate-700 text-slate-100">
          <CardContent className="p-6 flex flex-col sm:flex-row items-center gap-6">
            <Avatar className="w-24 h-24 ring-4 ring-indigo-500/40">
              <AvatarImage src={user?.avatarUrl} />
              <AvatarFallback className="bg-indigo-600 text-white text-2xl">
                {initials(user?.fullName, user?.username)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-2xl font-bold">{user?.fullName || user?.username || "—"}</h1>
              <p className="text-slate-400">@{user?.username}</p>
              <p className="text-slate-500 text-sm">{user?.email}</p>
            </div>
            <div className="w-full sm:w-64">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="font-semibold text-indigo-300">Level {level}</span>
                <span className="text-slate-400">{progressInLevel} / {levelSpan} XP</span>
              </div>
              <Progress value={pct} className="h-2 bg-slate-700" />
              <p className="text-xs text-slate-500 mt-1">
                {Math.max(0, nextLevelXP - xp)} XP to level {level + 1}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Stats grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {statCards.map((s) => (
            <Card key={s.label} className="bg-slate-800 border-slate-700 text-slate-100">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-indigo-500/15 text-indigo-300">
                  <s.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">{s.label}</p>
                  <p className="text-xl font-bold">{isLoading ? "…" : s.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Badges */}
        <Card className="bg-slate-800 border-slate-700 text-slate-100">
          <CardHeader>
            <CardTitle>Your Badges</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {ALL_BADGES.map((b) => {
              const earned = earnedBadges.get(b.code);
              const isEarned = !!earned;
              return (
                <div
                  key={b.code}
                  className={`relative rounded-lg p-4 border text-center transition ${
                    isEarned
                      ? "bg-slate-900 border-indigo-500/40"
                      : "bg-slate-900/50 border-slate-700 opacity-50 grayscale"
                  }`}
                >
                  <div className="text-3xl mb-1">{b.icon}</div>
                  <p className="text-sm font-semibold">{b.name}</p>
                  <p className="text-xs text-slate-400 mt-1">{b.description}</p>
                  {isEarned ? (
                    earned?.earnedAt && (
                      <p className="text-[10px] text-indigo-400 mt-2">
                        {format(new Date(earned.earnedAt), "MMM d, yyyy")}
                      </p>
                    )
                  ) : (
                    <Lock className="w-3 h-3 absolute top-2 right-2 text-slate-500" />
                  )}
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Recent sessions */}
        <Card className="bg-slate-800 border-slate-700 text-slate-100">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-4 h-4" /> Recent Sessions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {isLoading ? (
              <Skeleton className="h-16 bg-slate-700" />
            ) : (stats?.recentSessions?.length ?? 0) === 0 ? (
              <p className="text-slate-400 text-sm">No recent sessions yet.</p>
            ) : (
              stats!.recentSessions!.map((s, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 rounded-lg bg-slate-900 border border-slate-700"
                >
                  <div>
                    <p className="font-medium">{s.roomName || "Study Session"}</p>
                    <p className="text-xs text-slate-400">
                      {s.startedAt ? format(new Date(s.startedAt), "PPp") : ""}
                    </p>
                  </div>
                  <p className="text-sm text-indigo-300">
                    {Math.round((s.durationMinutes ?? 0))} min
                  </p>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
