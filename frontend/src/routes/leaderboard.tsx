import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AppNavbar } from "@/components/layout/AppNavbar";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Trophy } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import {
  leaderboardService,
  type LeaderboardEntry,
  type LeaderboardType,
} from "@/services/leaderboardService";

export const Route = createFileRoute("/leaderboard")({
  component: () => (
    <ProtectedRoute>
      <LeaderboardPage />
    </ProtectedRoute>
  ),
});

function initials(name?: string, fallback?: string) {
  const s = (name || fallback || "?").trim();
  const parts = s.split(/\s+/);
  return ((parts[0]?.[0] || "") + (parts[1]?.[0] || "")).toUpperCase() || s[0]?.toUpperCase() || "?";
}

function rankBadge(rank: number) {
  if (rank === 1) return "🥇";
  if (rank === 2) return "🥈";
  if (rank === 3) return "🥉";
  return `#${rank}`;
}

function LeaderboardPage() {
  const [type, setType] = useState<LeaderboardType>("xp");
  const me = useAuthStore((s) => s.user);

  const { data: entries = [], isLoading } = useQuery({
    queryKey: ["leaderboard", type],
    queryFn: () => leaderboardService.list(type, 20),
  });

  const myRank = useMemo(
    () => entries.find((e) => e.userId === me?.id)?.rank,
    [entries, me?.id]
  );

  const top3 = entries.slice(0, 3);
  const podiumOrder = [top3[1], top3[0], top3[2]]; // left, center, right

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <AppNavbar />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Trophy className="text-yellow-400" /> Global Leaderboard
            </h1>
            <p className="text-slate-400 mt-1">Top learners by {type === "xp" ? "XP points" : "study streak"}.</p>
          </div>
          <Card className="bg-slate-800 border-slate-700 text-slate-100">
            <CardContent className="p-4 text-center">
              <p className="text-xs uppercase text-slate-400">Your Rank</p>
              <p className="text-2xl font-bold text-indigo-400">
                {myRank ? `#${myRank}` : "—"}
              </p>
            </CardContent>
          </Card>
        </header>

        <Tabs value={type} onValueChange={(v) => setType(v as LeaderboardType)}>
          <TabsList className="bg-slate-800 border border-slate-700">
            <TabsTrigger value="xp">XP Points</TabsTrigger>
            <TabsTrigger value="streak">Study Streak</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Podium */}
        {isLoading ? (
          <div className="grid grid-cols-3 gap-4">
            {[0, 1, 2].map((i) => (
              <Skeleton key={i} className="h-40 bg-slate-800" />
            ))}
          </div>
        ) : top3.length > 0 ? (
          <div className="grid grid-cols-3 gap-3 sm:gap-4 items-end">
            {podiumOrder.map((entry, idx) => {
              if (!entry) return <div key={idx} />;
              const place = entry.rank!;
              const heights = ["h-32", "h-40", "h-28"];
              const colors = [
                "from-slate-400 to-slate-600",
                "from-yellow-400 to-yellow-600",
                "from-amber-600 to-amber-800",
              ];
              return (
                <Card
                  key={entry.userId}
                  className={`bg-slate-800 border-slate-700 ${heights[idx]} flex flex-col justify-end overflow-hidden`}
                >
                  <CardContent className="p-3 sm:p-4 flex flex-col items-center text-center">
                    <div className={`text-3xl mb-1`}>{rankBadge(place)}</div>
                    <Avatar className="w-12 h-12 mb-2 ring-2 ring-offset-2 ring-offset-slate-800 ring-indigo-500">
                      <AvatarImage src={entry.avatarUrl} />
                      <AvatarFallback className={`bg-gradient-to-br ${colors[idx]} text-white`}>
                        {initials(entry.fullName, entry.username)}
                      </AvatarFallback>
                    </Avatar>
                    <p className="text-sm font-semibold truncate w-full">{entry.username}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : null}

        {/* List */}
        <Card className="bg-slate-800 border-slate-700 text-slate-100">
          <CardContent className="p-0 divide-y divide-slate-700">
            {isLoading
              ? Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="p-4">
                    <Skeleton className="h-10 bg-slate-700" />
                  </div>
                ))
              : entries.length === 0
              ? (
                <div className="p-8 text-center text-slate-400">No entries yet.</div>
              )
              : entries.map((e, i) => (
                  <LeaderboardRow
                    key={e.userId}
                    entry={e}
                    isMe={e.userId === me?.id}
                    type={type}
                    index={i}
                  />
                ))}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

function LeaderboardRow({
  entry,
  isMe,
  type,
  index,
}: {
  entry: LeaderboardEntry;
  isMe: boolean;
  type: LeaderboardType;
  index: number;
}) {
  const rank = entry.rank ?? index + 1;
  const studyHours = ((entry.totalStudyMinutes ?? 0) / 60).toFixed(1);
  const value =
    type === "xp" ? `${entry.xpPoints ?? 0} XP` : `${entry.currentStreak ?? 0} 🔥`;

  return (
    <div
      className={`flex items-center gap-3 sm:gap-4 p-3 sm:p-4 transition-colors hover:bg-slate-700/40 animate-in fade-in slide-in-from-bottom-1 ${
        isMe ? "border-l-4 border-indigo-500 bg-indigo-500/5" : ""
      }`}
      style={{ animationDelay: `${index * 30}ms`, animationFillMode: "both" }}
    >
      <div className="w-10 text-center text-lg font-bold text-slate-200">
        {rankBadge(rank)}
      </div>
      <Avatar className="w-10 h-10">
        <AvatarImage src={entry.avatarUrl} />
        <AvatarFallback className="bg-indigo-600 text-white">
          {initials(entry.fullName, entry.username)}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <p className="font-medium truncate">
          {entry.username}
          {isMe && <span className="text-indigo-400 text-xs ml-2">(you)</span>}
        </p>
        {entry.fullName && (
          <p className="text-xs text-slate-400 truncate">{entry.fullName}</p>
        )}
      </div>
      {entry.level != null && (
        <Badge variant="secondary" className="bg-slate-700 text-slate-200 hidden sm:inline-flex">
          Lvl {entry.level}
        </Badge>
      )}
      <div className="text-right">
        <p className="font-semibold text-indigo-300">{value}</p>
        <p className="text-xs text-slate-400">{studyHours}h studied</p>
      </div>
    </div>
  );
}
