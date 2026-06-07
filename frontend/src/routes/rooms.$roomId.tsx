import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import toast from "react-hot-toast";
import ReactMarkdown from "react-markdown";
import {
  ArrowLeft, Copy, Users, Send, Smile, Crown, Loader2, Play, Square, LogIn,
  Clipboard, Plus, Trash2, Download, Calendar as CalendarIcon,
} from "lucide-react";
import { api } from "@/services/api";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import type { AIQueryType } from "@/services/aiService";
import type { Note } from "@/services/notesService";
import type { TaskPriority } from "@/services/tasksService";
import { chatService, type ChatMessage } from "@/services/chatService";
import { sessionService, type StudySession } from "@/services/sessionService";
import { notesService } from "@/services/notesService";
import { tasksService, type Task } from "@/services/tasksService";
import { aiService } from "@/services/aiService";
import { useAuthStore } from "@/store/authStore";
import { useRoomWebSocket } from "@/hooks/useWebSocket";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export const Route = createFileRoute("/rooms/$roomId")({
  component: () => (
    <ProtectedRoute>
      <RoomPage />
    </ProtectedRoute>
  ),
});

const EMOJIS = ["😀","😂","🔥","💡","👍","🎯","📚","✅","🚀","💪","🤔","😅","🙌","❤️","⭐","🎉","👏","💯","🤖","📝"];

const initials = (name?: string) =>
  (name || "?").split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();

const isSingleEmoji = (s: string) => {
  const t = s.trim();
  if (!t) return false;
  // crude: length<=4 and no ascii letters/digits
  return t.length <= 4 && !/[a-zA-Z0-9]/.test(t);
};

function RoomPage() {
  const { roomId } = Route.useParams();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const currentUser = useAuthStore((s) => s.user);

  const roomQ = useQuery({
    queryKey: ["room", roomId],
    queryFn: async () => (await api.get(`/rooms/${roomId}`)).data,
  });

  const historyQ = useQuery({
    queryKey: ["chat", roomId],
    queryFn: () => chatService.history(roomId, 0, 50),
  });

  const sessionQ = useQuery({
    queryKey: ["session", roomId],
    queryFn: () => sessionService.active(roomId),
  });

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [session, setSession] = useState<StudySession | null>(null);

  useEffect(() => {
    if (historyQ.data) {
      // ensure chronological asc
      const sorted = [...historyQ.data].sort(
        (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
      setMessages(sorted);
    }
  }, [historyQ.data]);

  useEffect(() => {
    setSession(sessionQ.data ?? null);
  }, [sessionQ.data]);

  useRoomWebSocket(roomId, {
    onChat: (msg) => setMessages((prev) => [...prev, msg]),
    onSession: (s) => setSession(s ?? null),
    onTasks: () => qc.invalidateQueries({ queryKey: ["tasks", roomId] }),
    onNotes: () => qc.invalidateQueries({ queryKey: ["notes", roomId] }),
  });

  const room = roomQ.data?.data || roomQ.data;
  const isLoading = roomQ.isLoading || historyQ.isLoading;

  if (isLoading) {
    return (
        <div className="h-screen flex items-center justify-center bg-slate-900">
          <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
        </div>
    );
  }

  if (roomQ.isError || !room) {
    return (
        <div className="h-screen flex items-center justify-center bg-slate-900 text-white">
          <div className="text-center">
            <p className="mb-4">Failed to load room.</p>
            <Button onClick={() => navigate({ to: "/rooms" })}>Back to rooms</Button>
          </div>
        </div>
    );
  }

  const code = room.code || room.roomCode || "";
  const members: any[] = room.members || room.participants || [];
  const ownerId = room.owner?.id;
  console.log("ROOM DATA =", room);
  console.log("MEMBERS =", room.members);
  console.log("PARTICIPANTS =", room.participants);
  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      toast.success("Copied!");
    } catch { toast.error("Copy failed"); }
  };

  return (
    <div className="h-screen flex flex-col bg-slate-950 text-white overflow-hidden">
      {/* TOP BAR */}
      <header className="bg-slate-900 border-b border-slate-800 px-6 py-3 flex flex-wrap items-center gap-4 shrink-0">
        <button
          onClick={() => navigate({ to: "/rooms" })}
          className="inline-flex items-center gap-1 text-slate-300 hover:text-white text-sm"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        <h1 className="text-lg font-bold">{room.name}</h1>
        {room.subject && (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            {room.subject}
          </span>
        )}
        {code && (
          <button
            onClick={copyCode}
            className="inline-flex items-center gap-1.5 text-sm bg-slate-800 hover:bg-slate-700 px-3 py-1 rounded-lg"
          >
            <span className="text-slate-400">Code:</span>
            <span className="font-mono">{code}</span>
            <Copy className="h-3.5 w-3.5 text-slate-400" />
          </button>
        )}
        <div className="inline-flex items-center gap-1.5 text-sm text-slate-400">
          <Users className="h-4 w-4" /> {members.length || room.memberCount || 0} members
        </div>
      </header>

      {/* MAIN */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* LEFT: Chat */}
        <ChatPanel
          roomId={roomId}
          messages={messages}
          setMessages={setMessages}
          currentUserId={currentUser?.id}
        />
        {/* RIGHT */}
        <aside className="w-full md:w-80 bg-slate-900 border-t md:border-t-0 md:border-l border-slate-800 flex flex-col overflow-y-auto">
          <SessionCard
            roomId={roomId}
            session={session}
            setSession={setSession}
            currentUserId={currentUser?.id}
          />

          <MembersCard members={members} ownerId={ownerId} />
          <SideTabs roomId={roomId} />
        </aside>
      </div>
    </div>
  );
}

/* -------- Chat -------- */
function ChatPanel({
  roomId, messages, setMessages, currentUserId,
}: {
  roomId: string;
  messages: ChatMessage[];
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  currentUserId?: string;
}) {
  const [text, setText] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const sendMutation = useMutation({
    mutationFn: async (content: string) => {
      if (content.trim().toLowerCase().startsWith("@ai ")) {
        const prompt = content.trim().slice(4);
        // optimistic: post the user message first
        await chatService.send(roomId, content, "TEXT").catch(() => {});
        const res = await aiService.ask(roomId, prompt);
        return res;
      }
      return chatService.send(roomId, content, "TEXT");
    },
    onError: () => toast.error("Failed to send"),
  });

  const send = () => {
    const value = text.trim();
    if (!value) return;
    setText("");
    sendMutation.mutate(value);
  };

  return (
    <section className="flex-1 flex flex-col overflow-hidden">
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 && (
          <p className="text-center text-slate-500 text-sm py-8">No messages yet. Say hi 👋</p>
        )}
        {messages.map((m) => (
          <MessageBubble key={m.id} msg={m} isOwn={m.sender?.id === currentUserId} />
        ))}
      </div>

      <div className="bg-slate-900 border-t border-slate-800 p-4 flex items-end gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white shrink-0">
              <Smile className="h-5 w-5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 bg-slate-800 border-slate-700 p-2">
            <div className="grid grid-cols-5 gap-1">
              {EMOJIS.map((e) => (
                <button key={e} onClick={() => setText((t) => t + e)}
                  className="text-2xl hover:bg-slate-700 rounded-md p-1">
                  {e}
                </button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
          }}
          placeholder="Message... (type @ai for AI help)"
          rows={1}
          className="flex-1 min-h-0 resize-none bg-slate-800 border-slate-700 rounded-xl px-4 py-2 text-white"
        />
        <Button
          onClick={send}
          disabled={!text.trim() || sendMutation.isPending}
          className="bg-indigo-600 hover:bg-indigo-700 rounded-xl shrink-0"
          size="icon"
        >
          {sendMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        </Button>
      </div>
    </section>
  );
}

function MessageBubble({ msg, isOwn }: { msg: ChatMessage; isOwn: boolean }) {
  const time = msg.createdAt ? format(new Date(msg.createdAt), "h:mm a") : "";

  if (msg.type === "SYSTEM") {
    return (
      <div className="flex items-center gap-3 text-slate-500 text-xs italic">
        <div className="flex-1 h-px bg-slate-800" />
        <span>{msg.content}</span>
        <div className="flex-1 h-px bg-slate-800" />
      </div>
    );
  }

  if (msg.type === "AI_RESPONSE") {
    return (
      <div className="bg-slate-900 border border-indigo-500/50 rounded-xl p-4">
        <div className="text-indigo-400 font-semibold mb-2">🤖 AI Assistant</div>
        <div className="prose prose-invert prose-sm max-w-none">
          <ReactMarkdown>{msg.content}</ReactMarkdown>
        </div>
        {time && <div className="text-xs text-slate-500 mt-2">{time}</div>}
      </div>
    );
  }

  const isEmoji = isSingleEmoji(msg.content);

  if (isOwn) {
    return (
      <div className="flex flex-col items-end">
        {isEmoji ? (
          <div className="text-4xl">{msg.content}</div>
        ) : (
          <div className="bg-indigo-600 rounded-xl rounded-br-sm px-4 py-2 max-w-[70%] whitespace-pre-wrap break-words">
            {msg.content}
          </div>
        )}
        {time && <div className="text-xs text-slate-500 mt-1">{time}</div>}
      </div>
    );
  }

  return (
    <div className="flex items-end gap-2">
      <div className="h-8 w-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-medium shrink-0">
        {initials(msg.sender?.fullName || msg.sender?.username)}
      </div>
      <div className="flex flex-col items-start max-w-[70%]">
        {msg.sender?.username && (
          <div className="text-xs text-slate-400 mb-0.5 ml-1">{msg.sender.username}</div>
        )}
        {isEmoji ? (
          <div className="text-4xl">{msg.content}</div>
        ) : (
          <div className="bg-slate-700 rounded-xl rounded-bl-sm px-4 py-2 whitespace-pre-wrap break-words">
            {msg.content}
          </div>
        )}
        {time && <div className="text-xs text-slate-500 mt-1 ml-1">{time}</div>}
      </div>
    </div>
  );
}

/* -------- Session -------- */
function SessionCard({
  roomId, session, setSession, currentUserId,
}: {
  roomId: string;
  session: StudySession | null;
  setSession: (s: StudySession | null) => void;
  currentUserId?: string;
}) {
  console.log("CURRENT USER =", currentUserId);
  console.log("SESSION =", session);
  console.log("STARTED BY =", session?.startedBy);
  const [elapsed, setElapsed] = useState(0);
  useEffect(() => {
    console.log("SESSION START TIME =", session?.startTime);

    if (!session?.startTime) return;

    const tick = () =>
        setElapsed(
            Math.floor(
                (Date.now() - new Date(session.startTime).getTime()) / 1000
            )
        );

    tick();
    const id = setInterval(tick, 1000);

    return () => clearInterval(id);
  }, [session?.startTime]);

  const startM = useMutation({
    mutationFn: () => sessionService.start(roomId),
    onSuccess: (s) => { setSession(s); toast.success("Session started"); },
    onError: () => toast.error("Could not start session"),
  });
  const endM = useMutation({
    mutationFn: () => sessionService.end(session!.id),
    onSuccess: () => { setSession(null); toast.success("Session ended"); },
    onError: () => toast.error("Could not end session"),
  });


  const fmt = useMemo(() => {
    const h = String(Math.floor(elapsed / 3600)).padStart(2, "0");
    const m = String(Math.floor((elapsed % 3600) / 60)).padStart(2, "0");
    const s = String(elapsed % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  }, [elapsed]);


  const participants = session?.participants || [];

  const isStarter =
      session &&
      currentUserId &&
      Number(session.startedBy?.id) === Number(currentUserId);

  const isParticipant = participants.some(
      (p) => Number(p.id) === Number(currentUserId)
  );
  return (
    <div className="p-4 border-b border-slate-800">
      <h3 className="font-bold text-white mb-3">⏱️ Study Session</h3>
      {!session ? (
        <>
          <p className="text-slate-400 text-sm mb-3">No active session</p>
          <Button
            onClick={() => startM.mutate()}
            disabled={startM.isPending}
            className="w-full bg-green-600 hover:bg-green-700 rounded-xl"
          >
            <Play className="h-4 w-4" /> Start Session
          </Button>
        </>
      ) : (
        <>
          <div className="flex items-center gap-2 mb-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
            </span>
            <span className="text-green-400 text-sm font-medium">Session Active</span>
          </div>
          <div className="font-mono text-3xl text-center my-3 text-white">{fmt}</div>
          <p className="text-xs text-slate-400 text-center mb-3">
            {participants.length} participants
          </p>
          {isStarter ? (
            <Button
              onClick={() => endM.mutate()}
              disabled={endM.isPending}
              className="w-full bg-red-600 hover:bg-red-700 rounded-xl"
            >
              <Square className="h-4 w-4" /> End Session
            </Button>
          ) :  null}
        </>
      )}
    </div>
  );
}

/* -------- Members -------- */
function MembersCard({ members, ownerId }: { members: any[]; ownerId?: string }) {
  return (
    <div className="p-4 border-b border-slate-800">
      <h3 className="font-bold text-white mb-3">👥 Members ({members.length})</h3>
      <ul className="space-y-2">
        {members.map((m) => (
          <li key={m.id} className="flex items-center gap-2 text-sm">
            <div className="h-7 w-7 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-medium">
              {initials(m.fullName || m.username)}
            </div>
            <span className="text-slate-200 flex-1 truncate">{m.username || m.fullName}</span>
            {m.id === ownerId && <Crown className="h-4 w-4 text-yellow-400" />}
          </li>
        ))}
        {members.length === 0 && <li className="text-slate-500 text-sm">No members loaded</li>}
      </ul>
    </div>
  );
}

/* -------- Side tabs (AI / Notes / Tasks) -------- */
function SideTabs({ roomId }: { roomId: string }) {
  return (
    <div className="p-4 flex-1 flex flex-col min-h-0">
      <Tabs defaultValue="ai" className="flex-1 flex flex-col">
        <TabsList className="bg-slate-800 grid grid-cols-3">
          <TabsTrigger value="ai">🤖 AI</TabsTrigger>
          <TabsTrigger value="notes">📝 Notes</TabsTrigger>
          <TabsTrigger value="tasks">✅ Tasks</TabsTrigger>
        </TabsList>
        <TabsContent value="ai" className="flex-1 overflow-y-auto">
          <AITab roomId={roomId} />
        </TabsContent>
        <TabsContent value="notes" className="flex-1 overflow-y-auto">
          <NotesTab roomId={roomId} />
        </TabsContent>
        <TabsContent value="tasks" className="flex-1 overflow-y-auto">
          <TasksTab roomId={roomId} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

/* -------- AI Assistant Tab -------- */
const AI_MODES: { type: AIQueryType; label: string; placeholder: string }[] = [
  { type: "EXPLAIN", label: "📖 Explain", placeholder: "What topic do you want explained?" },
  { type: "QUIZ", label: "❓ Quiz", placeholder: "What subject for quiz questions?" },
  { type: "SUMMARIZE", label: "📋 Summarize", placeholder: "Paste your notes here to summarize..." },
  { type: "INTERVIEW", label: "💼 Interview Qs", placeholder: "What role/topic for interview questions?" },
];

function AITab({ roomId: _roomId }: { roomId: string }) {
  const [question, setQuestion] = useState("");
  const [queryType, setQueryType] = useState<AIQueryType>("EXPLAIN");
  const [response, setResponse] = useState("");

  const m = useMutation({
    mutationFn: () => aiService.query(question, queryType),
    onSuccess: (text) => setResponse(text),
    onError: () => toast.error("AI request failed"),
  });

  const placeholder = AI_MODES.find((mm) => mm.type === queryType)?.placeholder || "";

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(response);
      toast.success("Copied to clipboard!");
    } catch { toast.error("Copy failed"); }
  };

  return (
    <div className="space-y-3 pt-3">
      <div className="grid grid-cols-2 gap-2">
        {AI_MODES.map((mode) => (
          <button
            key={mode.type}
            onClick={() => setQueryType(mode.type)}
            className={cn(
              "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              queryType === mode.type
                ? "bg-indigo-600 text-white"
                : "bg-slate-700 text-slate-200 hover:bg-slate-600"
            )}
          >
            {mode.label}
          </button>
        ))}
      </div>

      <Textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder={placeholder}
        rows={3}
        className="w-full bg-slate-800 border-slate-700 text-white resize-none"
      />

      <Button
        onClick={() => m.mutate()}
        disabled={!question.trim() || m.isPending}
        className="w-full bg-indigo-600 hover:bg-indigo-700"
      >
        {m.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Ask AI ✨"}
      </Button>

      {m.isPending && (
        <div className="bg-slate-900 border border-indigo-500/30 rounded-xl p-4 animate-pulse text-indigo-300">
          🤖 Thinking...
        </div>
      )}

      {!m.isPending && response && (
        <div className="bg-slate-900 border border-indigo-500/30 rounded-xl p-4 relative">
          <button
            onClick={copy}
            className="absolute top-3 right-3 text-slate-400 hover:text-white"
            title="Copy"
          >
            <Clipboard className="h-4 w-4" />
          </button>
          <div className="text-indigo-400 font-semibold mb-2">🤖 AI Response</div>
          <div className="prose prose-invert prose-sm max-w-none">
            <ReactMarkdown>{response}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
}

/* -------- Notes Tab -------- */
function NotesTab({ roomId }: { roomId: string }) {
  const qc = useQueryClient();
  const q = useQuery({ queryKey: ["notes", roomId], queryFn: () => notesService.list(roomId) });
  const notes: Note[] = q.data || [];

  const [activeId, setActiveId] = useState<string | null>(null);
  const [content, setContent] = useState("");
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastSavedRef = useRef<string>("");

  // Pick first note when list loads
  useEffect(() => {
    if (!activeId && notes.length > 0) setActiveId(notes[0].id);
  }, [notes, activeId]);

  const activeNote = useMemo(() => notes.find((n) => n.id === activeId) || null, [notes, activeId]);

  useEffect(() => {
    if (activeNote) {
      setContent(activeNote.content || "");
      lastSavedRef.current = activeNote.content || "";
      setSaveStatus("idle");
    }
  }, [activeNote?.id]);

  const updateM = useMutation({
    mutationFn: (payload: { content: string }) =>
      notesService.update(activeId!, { content: payload.content }),
    onSuccess: () => {
      setSaveStatus("saved");
      qc.invalidateQueries({ queryKey: ["notes", roomId] });
    },
    onError: () => { setSaveStatus("idle"); toast.error("Save failed"); },
  });

  // Debounced auto save
  useEffect(() => {
    if (!activeId) return;
    if (content === lastSavedRef.current) return;
    setSaveStatus("saving");
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      lastSavedRef.current = content;
      updateM.mutate({ content });
    }, 1500);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [content, activeId]);

  const createM = useMutation({
    mutationFn: (title: string) => notesService.create(roomId, title),
    onSuccess: (note) => {
      qc.invalidateQueries({ queryKey: ["notes", roomId] });
      setActiveId(note.id);
      setNewTitle("");
      setDialogOpen(false);
      toast.success("Note created");
    },
    onError: () => toast.error("Could not create note"),
  });

  const exportPdf = async () => {
    if (!activeId) return;
    try {
      const blob = await notesService.exportPdf(activeId);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${activeNote?.title || "note"}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch {
      toast.error("Export failed");
    }
  };

  if (q.isLoading) {
    return (
      <div className="pt-3 space-y-2">
        <div className="h-8 bg-slate-800 rounded animate-pulse" />
        <div className="h-32 bg-slate-800 rounded animate-pulse" />
      </div>
    );
  }

  return (
    <div className="pt-3 flex flex-col gap-3 h-full">
      <div className="flex items-center gap-2">
        <Select value={activeId ?? ""} onValueChange={(v) => setActiveId(v)}>
          <SelectTrigger className="bg-slate-800 border-slate-700 text-white flex-1">
            <SelectValue placeholder={notes.length === 0 ? "No notes yet" : "Select a note"} />
          </SelectTrigger>
          <SelectContent className="bg-slate-800 border-slate-700 text-white">
            {notes.map((n) => (
              <SelectItem key={n.id} value={n.id}>
                {n.title || "Untitled"}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 shrink-0">
              <Plus className="h-4 w-4" /> New
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-900 border-slate-700 text-white">
            <DialogHeader>
              <DialogTitle>New Note</DialogTitle>
            </DialogHeader>
            <Input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Note title"
              className="bg-slate-800 border-slate-700 text-white"
            />
            <DialogFooter>
              <Button
                onClick={() => newTitle.trim() && createM.mutate(newTitle.trim())}
                disabled={!newTitle.trim() || createM.isPending}
                className="bg-indigo-600 hover:bg-indigo-700"
              >
                {createM.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Create"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {activeNote ? (
        <>
          <div className="flex items-center justify-between gap-2">
            <h4 className="text-white font-bold truncate">{activeNote.title}</h4>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs text-slate-400">
                {saveStatus === "saving" ? "Saving..." : saveStatus === "saved" ? "Saved ✓" : ""}
              </span>
              <Button size="sm" variant="ghost" onClick={exportPdf} className="text-slate-300 hover:text-white">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Start writing..."
            className="w-full flex-1 bg-slate-800 border border-slate-700 rounded-xl p-3 font-mono text-sm text-slate-200 resize-none min-h-[200px]"
          />
        </>
      ) : (
        <div className="text-slate-500 text-sm text-center py-8">
          No notes yet. Create your first note ✨
        </div>
      )}
    </div>
  );
}

/* -------- Tasks Tab -------- */
const PRIORITY_STYLES: Record<TaskPriority, string> = {
  HIGH: "bg-red-500/20 text-red-300 border-red-500/40",
  MEDIUM: "bg-yellow-500/20 text-yellow-300 border-yellow-500/40",
  LOW: "bg-green-500/20 text-green-300 border-green-500/40",
};

function TasksTab({ roomId }: { roomId: string }) {
  const qc = useQueryClient();
  const q = useQuery({ queryKey: ["tasks", roomId], queryFn: () => tasksService.list(roomId) });

  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<TaskPriority>("MEDIUM");
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined);

  const invalidate = () => qc.invalidateQueries({ queryKey: ["tasks", roomId] });

  const addM = useMutation({
    mutationFn: () =>
      tasksService.create(roomId, {
        title: title.trim(),
        priority,
        dueDate: dueDate ? dueDate.toISOString() : null,
      }),
    onSuccess: () => {
      setTitle(""); setPriority("MEDIUM"); setDueDate(undefined); setShowForm(false);
      invalidate();
    },
    onError: () => toast.error("Add failed"),
  });

  const completeM = useMutation({
    mutationFn: (id: string) => tasksService.complete(id),
    onSuccess: invalidate,
  });

  const delM = useMutation({
    mutationFn: (id: string) => tasksService.remove(id),
    onSuccess: invalidate,
  });

  const tasks = q.data || [];
  const sorted = useMemo(() => {
    const pending = tasks.filter((t) => !t.completed);
    const done = tasks.filter((t) => t.completed);
    return [...pending, ...done];
  }, [tasks]);

  if (q.isLoading) {
    return (
      <div className="pt-3 space-y-2">
        {[0, 1, 2].map((i) => <div key={i} className="h-10 bg-slate-800 rounded animate-pulse" />)}
      </div>
    );
  }

  return (
    <div className="space-y-3 pt-3">
      {!showForm ? (
        <Button onClick={() => setShowForm(true)} className="w-full bg-indigo-600 hover:bg-indigo-700">
          <Plus className="h-4 w-4" /> Add Task
        </Button>
      ) : (
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-3 space-y-2">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task title"
            className="bg-slate-900 border-slate-700 text-white"
          />
          <div className="flex gap-2">
            <Select value={priority} onValueChange={(v) => setPriority(v as TaskPriority)}>
              <SelectTrigger className="bg-slate-900 border-slate-700 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700 text-white">
                <SelectItem value="HIGH">High</SelectItem>
                <SelectItem value="MEDIUM">Medium</SelectItem>
                <SelectItem value="LOW">Low</SelectItem>
              </SelectContent>
            </Select>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="bg-slate-900 border-slate-700 text-white hover:bg-slate-700">
                  <CalendarIcon className="h-4 w-4" />
                  {dueDate ? format(dueDate, "MMM d") : "Date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-slate-800 border-slate-700" align="start">
                <Calendar
                  mode="single"
                  selected={dueDate}
                  onSelect={setDueDate}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => addM.mutate()}
              disabled={!title.trim() || addM.isPending}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700"
            >
              {addM.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Add"}
            </Button>
            <Button
              variant="ghost"
              onClick={() => { setShowForm(false); setTitle(""); setDueDate(undefined); }}
              className="text-slate-300 hover:text-white"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      <ul className="space-y-1.5">
        {sorted.map((t) => (
          <li
            key={t.id}
            className={cn(
              "group flex items-center gap-2 bg-slate-800 rounded-lg px-3 py-2",
              t.completed && "opacity-50"
            )}
          >
            <input
              type="checkbox"
              checked={t.completed}
              onChange={() => !t.completed && completeM.mutate(t.id)}
              disabled={t.completed}
              className="accent-indigo-500"
            />
            <div className="flex-1 min-w-0">
              <div className={cn("text-sm text-slate-200 truncate", t.completed && "line-through")}>
                {t.title}
              </div>
              {t.dueDate && (
                <div className="text-xs text-slate-400">
                  Due {format(new Date(t.dueDate), "MMM d")}
                </div>
              )}
            </div>
            {t.priority && (
              <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-full border", PRIORITY_STYLES[t.priority])}>
                {t.priority}
              </span>
            )}
            <button
              onClick={() => delM.mutate(t.id)}
              className="text-slate-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
              title="Delete"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </li>
        ))}
        {sorted.length === 0 && (
          <li className="text-slate-500 text-sm text-center py-6">No tasks yet. Add your first one ✨</li>
        )}
      </ul>
    </div>
  );
}

