import { useMemo, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AlertCircle, Lock, Search, Sparkles, Users } from "lucide-react";
import toast from "react-hot-toast";

import { AppNavbar } from "@/components/layout/AppNavbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { roomService, SUBJECTS, type Room } from "@/services/roomService";

export const Route = createFileRoute("/rooms/")({
  component: BrowseRoomsPage,
});

const FILTER_CHIPS = ["All", ...SUBJECTS] as const;

function BrowseRoomsPage() {
  const [query, setQuery] = useState("");
  const [subject, setSubject] = useState<(typeof FILTER_CHIPS)[number]>("All");
  const [recommendInput, setRecommendInput] = useState("");
  const [recommendSubject, setRecommendSubject] = useState<string | null>(null);
  const [joinRoom, setJoinRoom] = useState<Room | null>(null);

  const roomsQ = useQuery({
    queryKey: ["rooms", "public"],
    queryFn: roomService.publicRooms,
  });

  const recommendQ = useQuery({
    queryKey: ["rooms", "recommend", recommendSubject],
    queryFn: () => roomService.recommend(recommendSubject!),
    enabled: !!recommendSubject,
  });

  const filtered = useMemo(() => {
    const list = roomsQ.data ?? [];
    const q = query.trim().toLowerCase();
    return list.filter((r) => {
      const matchesQ =
        !q ||
        r.name.toLowerCase().includes(q) ||
        (r.subject ?? "").toLowerCase().includes(q);
      const matchesSubject = subject === "All" || (r.subject ?? "") === subject;
      return matchesQ && matchesSubject;
    });
  }, [roomsQ.data, query, subject]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <AppNavbar />
      <main className="container mx-auto px-4 py-8">
        <header className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Browse Rooms</h1>
          <p className="mt-1 text-sm text-slate-400">
            Discover public study rooms or find one tailored to your subject.
          </p>
        </header>

        <div className="mb-4 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name or subject..."
              className="border-slate-700 bg-slate-800 pl-9 text-slate-100 placeholder:text-slate-500 focus-visible:ring-indigo-500"
            />
          </div>
          <div className="flex gap-2">
            <Input
              value={recommendInput}
              onChange={(e) => setRecommendInput(e.target.value)}
              placeholder="Smart Recommend (e.g. Calculus)"
              className="border-slate-700 bg-slate-800 text-slate-100 placeholder:text-slate-500 focus-visible:ring-indigo-500 sm:w-72"
            />
            <Button
              onClick={() => recommendInput.trim() && setRecommendSubject(recommendInput.trim())}
              className="bg-gradient-to-r from-indigo-500 to-violet-500 text-white hover:opacity-90"
            >
              <Sparkles className="h-4 w-4" />
              Recommend
            </Button>
          </div>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {FILTER_CHIPS.map((c) => {
            const active = subject === c;
            return (
              <button
                key={c}
                onClick={() => setSubject(c)}
                className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                  active
                    ? "border-indigo-500 bg-indigo-500/15 text-indigo-300"
                    : "border-slate-700 bg-slate-800 text-slate-300 hover:border-slate-600 hover:text-white"
                }`}
              >
                {c}
              </button>
            );
          })}
        </div>

        {recommendSubject && (
          <section className="mb-8">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-semibold">
                Recommendations for <span className="text-indigo-400">{recommendSubject}</span>
              </h2>
              <button
                onClick={() => {
                  setRecommendSubject(null);
                  setRecommendInput("");
                }}
                className="text-xs text-slate-400 hover:text-white"
              >
                Clear
              </button>
            </div>
            <RoomsGrid
              isLoading={recommendQ.isLoading}
              isError={recommendQ.isError}
              rooms={recommendQ.data ?? []}
              onJoin={setJoinRoom}
              onRetry={() => recommendQ.refetch()}
              emptyMessage="No recommendations for this subject yet."
            />
          </section>
        )}

        <RoomsGrid
          isLoading={roomsQ.isLoading}
          isError={roomsQ.isError}
          rooms={filtered}
          onJoin={setJoinRoom}
          onRetry={() => roomsQ.refetch()}
          emptyMessage="No rooms match your filters."
        />
      </main>

      <JoinRoomDialog room={joinRoom} onClose={() => setJoinRoom(null)} />
    </div>
  );
}

function RoomsGrid({
  isLoading,
  isError,
  rooms,
  onJoin,
  onRetry,
  emptyMessage,
}: {
  isLoading: boolean;
  isError: boolean;
  rooms: Room[];
  onJoin: (r: Room) => void;
  onRetry: () => void;
  emptyMessage: string;
}) {
  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-52 rounded-xl bg-slate-800" />
        ))}
      </div>
    );
  }
  if (isError) {
    return (
      <div className="flex items-center justify-between gap-4 rounded-xl border border-red-500/30 bg-red-500/10 p-4">
        <div className="flex items-center gap-3 text-sm text-red-200">
          <AlertCircle className="h-5 w-5" />
          Couldn't load rooms.
        </div>
        <Button size="sm" variant="outline" onClick={onRetry} className="border-red-500/40 bg-transparent text-red-200 hover:bg-red-500/20 hover:text-white">
          Retry
        </Button>
      </div>
    );
  }
  if (rooms.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-700 bg-slate-800/50 p-10 text-center text-sm text-slate-400">
        {emptyMessage}
      </div>
    );
  }
  const visibleRooms = rooms.filter(
      (r) => r.visibility === "PUBLIC" && r.status === "ACTIVE"
  );
  console.log("ROOMS =", rooms);
  return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visibleRooms.map((r) => (
            <RoomCard
                key={r.id}
                room={r}
                onJoin={onJoin}
            />
        ))}
      </div>
  );
}

function RoomCard({ room, onJoin }: { room: Room; onJoin: (r: Room) => void }) {
  const isActive = (room.status ?? "ACTIVE") === "ACTIVE";
  const owner = room.owner;
  const ownerName = owner?.fullName || owner?.username || "Unknown";
  const initials = ownerName.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();

  const members = room.currentParticipants ?? room.memberCount ?? 0;

  const max = room.maxParticipants ?? "∞";

  return (
    <div className="flex flex-col rounded-xl border border-slate-700 bg-slate-800 p-5 transition-colors hover:border-indigo-500">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-semibold text-white">{room.name}</h3>
        <div className="flex items-center gap-2">
          {room.passwordProtected && <Lock className="h-4 w-4 text-amber-400" />}
          <span className={`flex items-center gap-1.5 text-xs ${isActive ? "text-emerald-400" : "text-slate-500"}`}>
            <span className={`h-2 w-2 rounded-full ${isActive ? "bg-emerald-400 shadow-[0_0_8px] shadow-emerald-400/60" : "bg-slate-500"}`} />
            {isActive ? "Active" : "Inactive"}
          </span>
        </div>
      </div>

      {room.subject && (
        <span className="mt-2 inline-flex w-fit rounded-full bg-indigo-500/15 px-2.5 py-0.5 text-xs font-medium text-indigo-300">
          {room.subject}
        </span>
      )}

      {room.description && (
        <p className="mt-3 line-clamp-2 text-sm text-slate-400">{room.description}</p>
      )}

      <div className="mt-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <Avatar className="h-6 w-6">
            <AvatarImage src={owner?.avatarUrl} alt={ownerName} />
            <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-violet-500 text-[10px] text-white">
              {initials || "U"}
            </AvatarFallback>
          </Avatar>
          <span className="truncate text-xs text-slate-400">{ownerName}</span>
        </div>
        <span className="flex items-center gap-1 text-xs text-slate-400">
          <Users className="h-3.5 w-3.5" />
          {members}/{max}
        </span>
      </div>

      <Button
        onClick={() => onJoin(room)}
        className="mt-4 w-full bg-indigo-500 text-white hover:bg-indigo-400"
      >
        Join Room
      </Button>
    </div>
  );
}

function JoinRoomDialog({ room, onClose }: { room: Room | null; onClose: () => void }) {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");

  const joinM = useMutation({
    mutationFn: (vars: { code: string; password?: string }) =>
      roomService.join(vars.code, vars.password),
    onSuccess: (r) => {
      toast.success("Joined room");
      onClose();
      setPassword("");
      navigate({ to: "/rooms/$roomId", params: { roomId: r.id } });
    },
    onError: (e: { response?: { data?: { message?: string } }; message?: string }) => {
      toast.error(e?.response?.data?.message || e?.message || "Failed to join");
    },
  });

  const open = !!room;
  const code = room?.roomCode || room?.code || "";

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        if (!o) {
          onClose();
          setPassword("");
        }
      }}
    >
      <DialogContent className="border-slate-700 bg-slate-800 text-slate-100 sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Join {room?.name}</DialogTitle>
          <DialogDescription className="text-slate-400">
            Room code: <span className="font-mono text-slate-200">{code || "—"}</span>
          </DialogDescription>
        </DialogHeader>

        {room?.passwordProtected && (
          <div className="space-y-2">
            <Label htmlFor="join-pw" className="text-slate-300">Password</Label>
            <Input
              id="join-pw"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter room password"
              className="border-slate-700 bg-slate-900 text-slate-100 placeholder:text-slate-500 focus-visible:ring-indigo-500"
            />
          </div>
        )}

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={() => {
              onClose();
              setPassword("");
            }}
            className="border-slate-700 bg-transparent text-slate-200 hover:bg-slate-700 hover:text-white"
          >
            Cancel
          </Button>
          <Button
            onClick={() =>
              code &&
              joinM.mutate({
                code,
                password: room?.passwordProtected ? password : undefined,
              })
            }
            disabled={joinM.isPending || (room?.passwordProtected && !password)}
            className="bg-gradient-to-r from-indigo-500 to-violet-500 text-white hover:opacity-90"
          >
            {joinM.isPending ? "Joining..." : "Join"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
