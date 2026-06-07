import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { u as useQuery, b as useMutation } from "../_libs/tanstack__react-query.mjs";
import { z as zt } from "../_libs/react-hot-toast.mjs";
import { A as AppNavbar, a as Avatar, b as AvatarImage, c as AvatarFallback } from "./AppNavbar-JiN83LSY.mjs";
import { B as Button } from "./button-BXrfXN_b.mjs";
import { I as Input } from "./input-DwaGuH4D.mjs";
import { S as Skeleton } from "./skeleton-F-7As_y7.mjs";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogDescription, e as DialogFooter } from "./dialog-C9_4GAP6.mjs";
import { L as Label } from "./label-Brw405F4.mjs";
import { S as SUBJECTS, r as roomService } from "./roomService-_urGos11.mjs";
import { o as Search, j as Sparkles, k as CircleAlert, c as Lock, U as Users } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "crypto";
import "async_hooks";
import "util";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/goober.mjs";
import "../_libs/radix-ui__react-dropdown-menu.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-menu.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-roving-focus.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/radix-ui__react-avatar.mjs";
import "../_libs/@radix-ui/react-use-is-hydrated+[...].mjs";
import "../_libs/use-sync-external-store.mjs";
import "./router-Bov4sYtq.mjs";
import "../_libs/axios.mjs";
import "../_libs/form-data.mjs";
import "fs";
import "../_libs/combined-stream.mjs";
import "../_libs/delayed-stream.mjs";
import "path";
import "http";
import "https";
import "url";
import "../_libs/mime-types.mjs";
import "../_libs/mime-db.mjs";
import "../_libs/asynckit.mjs";
import "../_libs/es-set-tostringtag.mjs";
import "../_libs/get-intrinsic.mjs";
import "../_libs/es-object-atoms.mjs";
import "../_libs/es-errors.mjs";
import "../_libs/math-intrinsics.mjs";
import "../_libs/gopd.mjs";
import "../_libs/es-define-property.mjs";
import "../_libs/has-symbols.mjs";
import "../_libs/get-proto.mjs";
import "../_libs/dunder-proto.mjs";
import "../_libs/call-bind-apply-helpers.mjs";
import "../_libs/function-bind.mjs";
import "../_libs/hasown.mjs";
import "../_libs/has-tostringtag.mjs";
import "../_libs/proxy-from-env.mjs";
import "../_libs/https-proxy-agent.mjs";
import "net";
import "tls";
import "assert";
import "../_libs/debug.mjs";
import "../_libs/ms.mjs";
import "tty";
import "../_libs/supports-color.mjs";
import "os";
import "../_libs/has-flag.mjs";
import "../_libs/agent-base.mjs";
import "events";
import "http2";
import "../_libs/follow-redirects.mjs";
import "zlib";
import "../_libs/zustand.mjs";
import "../_libs/zod.mjs";
import "./authService-D2zzAqrm.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__react-label.mjs";
const FILTER_CHIPS = ["All", ...SUBJECTS];
function BrowseRoomsPage() {
  const [query, setQuery] = reactExports.useState("");
  const [subject, setSubject] = reactExports.useState("All");
  const [recommendInput, setRecommendInput] = reactExports.useState("");
  const [recommendSubject, setRecommendSubject] = reactExports.useState(null);
  const [joinRoom, setJoinRoom] = reactExports.useState(null);
  const roomsQ = useQuery({
    queryKey: ["rooms", "public"],
    queryFn: roomService.publicRooms
  });
  const recommendQ = useQuery({
    queryKey: ["rooms", "recommend", recommendSubject],
    queryFn: () => roomService.recommend(recommendSubject),
    enabled: !!recommendSubject
  });
  const filtered = reactExports.useMemo(() => {
    const list = roomsQ.data ?? [];
    const q = query.trim().toLowerCase();
    return list.filter((r) => {
      const matchesQ = !q || r.name.toLowerCase().includes(q) || (r.subject ?? "").toLowerCase().includes(q);
      const matchesSubject = subject === "All" || (r.subject ?? "") === subject;
      return matchesQ && matchesSubject;
    });
  }, [roomsQ.data, query, subject]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-slate-900 text-slate-100", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AppNavbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "container mx-auto px-4 py-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold tracking-tight", children: "Browse Rooms" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-slate-400", children: "Discover public study rooms or find one tailored to your subject." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex flex-col gap-3 sm:flex-row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: query, onChange: (e) => setQuery(e.target.value), placeholder: "Search by name or subject...", className: "border-slate-700 bg-slate-800 pl-9 text-slate-100 placeholder:text-slate-500 focus-visible:ring-indigo-500" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: recommendInput, onChange: (e) => setRecommendInput(e.target.value), placeholder: "Smart Recommend (e.g. Calculus)", className: "border-slate-700 bg-slate-800 text-slate-100 placeholder:text-slate-500 focus-visible:ring-indigo-500 sm:w-72" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => recommendInput.trim() && setRecommendSubject(recommendInput.trim()), className: "bg-gradient-to-r from-indigo-500 to-violet-500 text-white hover:opacity-90", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4" }),
            "Recommend"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-6 flex flex-wrap gap-2", children: FILTER_CHIPS.map((c) => {
        const active = subject === c;
        return /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setSubject(c), className: `rounded-full border px-3 py-1 text-xs font-medium transition-colors ${active ? "border-indigo-500 bg-indigo-500/15 text-indigo-300" : "border-slate-700 bg-slate-800 text-slate-300 hover:border-slate-600 hover:text-white"}`, children: c }, c);
      }) }),
      recommendSubject && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-lg font-semibold", children: [
            "Recommendations for ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-indigo-400", children: recommendSubject })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
            setRecommendSubject(null);
            setRecommendInput("");
          }, className: "text-xs text-slate-400 hover:text-white", children: "Clear" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(RoomsGrid, { isLoading: recommendQ.isLoading, isError: recommendQ.isError, rooms: recommendQ.data ?? [], onJoin: setJoinRoom, onRetry: () => recommendQ.refetch(), emptyMessage: "No recommendations for this subject yet." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(RoomsGrid, { isLoading: roomsQ.isLoading, isError: roomsQ.isError, rooms: filtered, onJoin: setJoinRoom, onRetry: () => roomsQ.refetch(), emptyMessage: "No rooms match your filters." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(JoinRoomDialog, { room: joinRoom, onClose: () => setJoinRoom(null) })
  ] });
}
function RoomsGrid({
  isLoading,
  isError,
  rooms,
  onJoin,
  onRetry,
  emptyMessage
}) {
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3", children: Array.from({
      length: 6
    }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-52 rounded-xl bg-slate-800" }, i)) });
  }
  if (isError) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4 rounded-xl border border-red-500/30 bg-red-500/10 p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-sm text-red-200", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-5 w-5" }),
        "Couldn't load rooms."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", onClick: onRetry, className: "border-red-500/40 bg-transparent text-red-200 hover:bg-red-500/20 hover:text-white", children: "Retry" })
    ] });
  }
  if (rooms.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-dashed border-slate-700 bg-slate-800/50 p-10 text-center text-sm text-slate-400", children: emptyMessage });
  }
  const visibleRooms = rooms.filter((r) => r.visibility === "PUBLIC" && r.status === "ACTIVE");
  console.log("ROOMS =", rooms);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3", children: visibleRooms.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(RoomCard, { room: r, onJoin }, r.id)) });
}
function RoomCard({
  room,
  onJoin
}) {
  const isActive = (room.status ?? "ACTIVE") === "ACTIVE";
  const owner = room.owner;
  const ownerName = owner?.fullName || owner?.username || "Unknown";
  const initials = ownerName.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();
  const members = room.currentParticipants ?? room.memberCount ?? 0;
  const max = room.maxParticipants ?? "∞";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col rounded-xl border border-slate-700 bg-slate-800 p-5 transition-colors hover:border-indigo-500", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-white", children: room.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        room.passwordProtected && /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-4 w-4 text-amber-400" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `flex items-center gap-1.5 text-xs ${isActive ? "text-emerald-400" : "text-slate-500"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `h-2 w-2 rounded-full ${isActive ? "bg-emerald-400 shadow-[0_0_8px] shadow-emerald-400/60" : "bg-slate-500"}` }),
          isActive ? "Active" : "Inactive"
        ] })
      ] })
    ] }),
    room.subject && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-2 inline-flex w-fit rounded-full bg-indigo-500/15 px-2.5 py-0.5 text-xs font-medium text-indigo-300", children: room.subject }),
    room.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 line-clamp-2 text-sm text-slate-400", children: room.description }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Avatar, { className: "h-6 w-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarImage, { src: owner?.avatarUrl, alt: ownerName }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "bg-gradient-to-br from-indigo-500 to-violet-500 text-[10px] text-white", children: initials || "U" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate text-xs text-slate-400", children: ownerName })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-xs text-slate-400", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-3.5 w-3.5" }),
        members,
        "/",
        max
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => onJoin(room), className: "mt-4 w-full bg-indigo-500 text-white hover:bg-indigo-400", children: "Join Room" })
  ] });
}
function JoinRoomDialog({
  room,
  onClose
}) {
  const navigate = useNavigate();
  const [password, setPassword] = reactExports.useState("");
  const joinM = useMutation({
    mutationFn: (vars) => roomService.join(vars.code, vars.password),
    onSuccess: (r) => {
      zt.success("Joined room");
      onClose();
      setPassword("");
      navigate({
        to: "/rooms/$roomId",
        params: {
          roomId: r.id
        }
      });
    },
    onError: (e) => {
      zt.error(e?.response?.data?.message || e?.message || "Failed to join");
    }
  });
  const open = !!room;
  const code = room?.roomCode || room?.code || "";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: (o) => {
    if (!o) {
      onClose();
      setPassword("");
    }
  }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "border-slate-700 bg-slate-800 text-slate-100 sm:max-w-md", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { children: [
        "Join ",
        room?.name
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogDescription, { className: "text-slate-400", children: [
        "Room code: ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-slate-200", children: code || "—" })
      ] })
    ] }),
    room?.passwordProtected && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "join-pw", className: "text-slate-300", children: "Password" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "join-pw", type: "password", value: password, onChange: (e) => setPassword(e.target.value), placeholder: "Enter room password", className: "border-slate-700 bg-slate-900 text-slate-100 placeholder:text-slate-500 focus-visible:ring-indigo-500" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => {
        onClose();
        setPassword("");
      }, className: "border-slate-700 bg-transparent text-slate-200 hover:bg-slate-700 hover:text-white", children: "Cancel" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => code && joinM.mutate({
        code,
        password: room?.passwordProtected ? password : void 0
      }), disabled: joinM.isPending || room?.passwordProtected && !password, className: "bg-gradient-to-r from-indigo-500 to-violet-500 text-white hover:opacity-90", children: joinM.isPending ? "Joining..." : "Join" })
    ] })
  ] }) });
}
export {
  BrowseRoomsPage as component
};
