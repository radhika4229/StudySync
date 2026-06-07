import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { P as ProtectedRoute } from "./ProtectedRoute-DGZFG5uG.mjs";
import { A as AppNavbar, n as notificationService } from "./AppNavbar-JiN83LSY.mjs";
import { B as Button } from "./button-BXrfXN_b.mjs";
import { S as Skeleton } from "./skeleton-F-7As_y7.mjs";
import { u as useAuthStore } from "./router-Bov4sYtq.mjs";
import { a as analyticsService } from "./analyticsService-BQjub-Zu.mjs";
import { r as roomService } from "./roomService-_urGos11.mjs";
import "../_libs/sockjs-client.mjs";
import "../_libs/react-hot-toast.mjs";
import { P as Plus, g as Compass, b as Trophy, h as BookOpen, i as CircleCheck, F as Flame, S as Star, j as Sparkles, k as CircleAlert, U as Users } from "../_libs/lucide-react.mjs";
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
import "../_libs/stomp__stompjs.mjs";
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
import "./authService-D2zzAqrm.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
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
import "../_libs/goober.mjs";
import "../_libs/url-parse.mjs";
import "../_libs/requires-port.mjs";
import "../_libs/querystringify.mjs";
import "../_libs/inherits.mjs";
import "../_libs/faye-websocket.mjs";
import "../_libs/websocket-driver.mjs";
import "../_libs/safe-buffer.mjs";
import "buffer";
import "../_libs/http-parser-js.mjs";
import "../_libs/websocket-extensions.mjs";
import "../_libs/eventsource.mjs";
function greeting() {
  const h = (/* @__PURE__ */ new Date()).getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}
function DashboardPage() {
  const user = useAuthStore((s) => s.user);
  const analyticsQ = useQuery({
    queryKey: ["analytics", "me"],
    queryFn: analyticsService.me
  });
  const roomsQ = useQuery({
    queryKey: ["rooms", "my"],
    queryFn: roomService.myRooms
  });
  const notifQ = useQuery({
    queryKey: ["notifications", "recent"],
    queryFn: notificationService.recent
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-slate-900 text-slate-100", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AppNavbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "container mx-auto px-4 py-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-3xl font-bold tracking-tight", children: [
          greeting(),
          ", ",
          user?.fullName?.split(" ")[0] || user?.username || "friend",
          " 👋"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-slate-400", children: "Here's a snapshot of your study journey today." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatsRow, { query: analyticsQ }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 grid gap-6 lg:grid-cols-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "lg:col-span-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold", children: "My Study Rooms" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, className: "bg-gradient-to-r from-indigo-500 to-violet-500 text-white hover:opacity-90", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/rooms/create", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
              "Create Room"
            ] }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(RoomsGrid, { query: roomsQ })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { title: "Quick Actions", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "outline", className: "w-full justify-start border-slate-700 bg-slate-900 text-slate-100 hover:bg-slate-700 hover:text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/rooms", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Compass, { className: "h-4 w-4" }),
              " Browse Public Rooms"
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "outline", className: "w-full justify-start border-slate-700 bg-slate-900 text-slate-100 hover:bg-slate-700 hover:text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/rooms/create", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
              " Create New Room"
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "outline", className: "w-full justify-start border-slate-700 bg-slate-900 text-slate-100 hover:bg-slate-700 hover:text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/leaderboard", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "h-4 w-4" }),
              " View Leaderboard"
            ] }) })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { title: "Recent Activity", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RecentActivity, { query: notifQ }) })
        ] })
      ] })
    ] })
  ] });
}
function StatsRow({
  query
}) {
  if (query.isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4", children: Array.from({
      length: 4
    }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-28 rounded-xl bg-slate-800" }, i)) });
  }
  if (query.isError) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorBox, { onRetry: () => query.refetch(), message: "Could not load your stats." });
  }
  const a = query.data;
  const hours = (a.totalStudyMinutes / 60).toFixed(1);
  const items = [{
    icon: BookOpen,
    emoji: "📚",
    label: "Total Study Hours",
    value: hours
  }, {
    icon: CircleCheck,
    emoji: "✅",
    label: "Sessions Completed",
    value: a.totalSessions
  }, {
    icon: Flame,
    emoji: "🔥",
    label: "Current Streak",
    value: `${a.currentStreak} days`
  }, {
    icon: Star,
    emoji: "⭐",
    label: "XP Points",
    value: `${a.xpPoints} · Lvl ${a.level}`
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4", children: items.map((it) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group rounded-xl border border-slate-700 bg-slate-800 p-5 transition-colors hover:border-indigo-500", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-slate-400", children: it.label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg", children: it.emoji })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 flex items-end gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl font-bold text-white", children: it.value }) })
  ] }, it.label)) });
}
function RoomsGrid({
  query
}) {
  if (query.isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 sm:grid-cols-2", children: Array.from({
      length: 4
    }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-36 rounded-xl bg-slate-800" }, i)) });
  }
  if (query.isError) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorBox, { onRetry: () => query.refetch(), message: "Could not load your rooms." });
  }
  const rooms = query.data ?? [];
  if (rooms.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-dashed border-slate-700 bg-slate-800/50 p-10 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-800", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-6 w-6 text-indigo-400" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-4 text-lg font-semibold text-white", children: "No rooms yet" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-slate-400", children: "Start a focused session with friends or classmates." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, className: "mt-5 bg-gradient-to-r from-indigo-500 to-violet-500 text-white hover:opacity-90", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/rooms/create", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
        " Create your first room"
      ] }) })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 sm:grid-cols-2", children: rooms.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(RoomCard, { room: r }, r.id)) });
}
function RoomCard({
  room
}) {
  const isActive = room.status === "ACTIVE";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group flex flex-col rounded-xl border border-slate-700 bg-slate-800 p-5 transition-colors hover:border-indigo-500", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-white", children: room.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `flex items-center gap-1.5 text-xs ${isActive ? "text-emerald-400" : "text-slate-500"}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `h-2 w-2 rounded-full ${isActive ? "bg-emerald-400 shadow-[0_0_8px] shadow-emerald-400/60" : "bg-slate-500"}` }),
        isActive ? "Active" : "Idle"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex flex-wrap items-center gap-2", children: [
      room.subject && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-indigo-500/15 px-2.5 py-0.5 text-xs font-medium text-indigo-300", children: room.subject }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-xs text-slate-400", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-3.5 w-3.5" }),
        room.currentParticipants ?? 0,
        " members"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-auto pt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "sm", className: "w-full bg-indigo-500 text-white hover:bg-indigo-400", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/rooms/$roomId", params: {
      roomId: room.id
    }, children: "Enter Room" }) }) })
  ] });
}
function Card({
  title,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-slate-700 bg-slate-800 p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-4 text-sm font-semibold uppercase tracking-wide text-slate-400", children: title }),
    children
  ] });
}
function RecentActivity({
  query
}) {
  if (query.isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: Array.from({
      length: 3
    }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 rounded-md bg-slate-700/60" }, i)) });
  }
  if (query.isError) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-400", children: "No recent activity." });
  }
  const items = (query.data ?? []).slice(0, 3);
  if (items.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-400", children: "You're all caught up." });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-3", children: items.map((n) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "rounded-md border border-slate-700/60 bg-slate-900/40 p-3 text-sm text-slate-200", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "line-clamp-2", children: n.message }),
    n.createdAt && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-slate-500", children: new Date(n.createdAt).toLocaleString() })
  ] }, n.id)) });
}
function ErrorBox({
  message,
  onRetry
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4 rounded-xl border border-red-500/30 bg-red-500/10 p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-sm text-red-200", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-5 w-5" }),
      message
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", onClick: onRetry, className: "border-red-500/40 bg-transparent text-red-200 hover:bg-red-500/20 hover:text-white", children: "Retry" })
  ] });
}
const SplitComponent = () => /* @__PURE__ */ jsxRuntimeExports.jsx(ProtectedRoute, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardPage, {}) });
export {
  SplitComponent as component
};
