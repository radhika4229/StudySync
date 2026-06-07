import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { A as AppNavbar, a as Avatar, b as AvatarImage, c as AvatarFallback } from "./AppNavbar-JiN83LSY.mjs";
import { P as ProtectedRoute } from "./ProtectedRoute-DGZFG5uG.mjs";
import { C as Card, a as CardContent } from "./card-CPilEoFz.mjs";
import { T as Tabs, a as TabsList, b as TabsTrigger } from "./tabs-c5KQ8wMi.mjs";
import { c as cva } from "../_libs/class-variance-authority.mjs";
import { c as cn } from "./button-BXrfXN_b.mjs";
import { S as Skeleton } from "./skeleton-F-7As_y7.mjs";
import { u as useAuthStore, a as api } from "./router-Bov4sYtq.mjs";
import "../_libs/sockjs-client.mjs";
import "../_libs/react-hot-toast.mjs";
import { b as Trophy } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-router.mjs";
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
import "../_libs/stomp__stompjs.mjs";
import "../_libs/radix-ui__react-tabs.mjs";
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
const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({ className, variant, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn(badgeVariants({ variant }), className), ...props });
}
const unwrap = (data) => data?.data !== void 0 ? data.data : data;
const leaderboardService = {
  list: async (type, limit = 20) => {
    const { data } = await api.get(`/leaderboard`, { params: { type, limit } });
    const out = unwrap(data);
    const arr = Array.isArray(out) ? out : [];
    return arr.map((e, i) => ({ ...e, rank: e.rank ?? i + 1 }));
  }
};
function initials(name, fallback) {
  const s = (name || fallback || "?").trim();
  const parts = s.split(/\s+/);
  return ((parts[0]?.[0] || "") + (parts[1]?.[0] || "")).toUpperCase() || s[0]?.toUpperCase() || "?";
}
function rankBadge(rank) {
  if (rank === 1) return "🥇";
  if (rank === 2) return "🥈";
  if (rank === 3) return "🥉";
  return `#${rank}`;
}
function LeaderboardPage() {
  const [type, setType] = reactExports.useState("xp");
  const me = useAuthStore((s) => s.user);
  const {
    data: entries = [],
    isLoading
  } = useQuery({
    queryKey: ["leaderboard", type],
    queryFn: () => leaderboardService.list(type, 20)
  });
  const myRank = reactExports.useMemo(() => entries.find((e) => e.userId === me?.id)?.rank, [entries, me?.id]);
  const top3 = entries.slice(0, 3);
  const podiumOrder = [top3[1], top3[0], top3[2]];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-slate-900 text-slate-100", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AppNavbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-3xl font-bold flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "text-yellow-400" }),
            " Global Leaderboard"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-slate-400 mt-1", children: [
            "Top learners by ",
            type === "xp" ? "XP points" : "study streak",
            "."
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-slate-800 border-slate-700 text-slate-100", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase text-slate-400", children: "Your Rank" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-indigo-400", children: myRank ? `#${myRank}` : "—" })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Tabs, { value: type, onValueChange: (v) => setType(v), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "bg-slate-800 border border-slate-700", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "xp", children: "XP Points" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "streak", children: "Study Streak" })
      ] }) }),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-4", children: [0, 1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-40 bg-slate-800" }, i)) }) : top3.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-3 sm:gap-4 items-end", children: podiumOrder.map((entry, idx) => {
        if (!entry) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", {}, idx);
        const place = entry.rank;
        const heights = ["h-32", "h-40", "h-28"];
        const colors = ["from-slate-400 to-slate-600", "from-yellow-400 to-yellow-600", "from-amber-600 to-amber-800"];
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: `bg-slate-800 border-slate-700 ${heights[idx]} flex flex-col justify-end overflow-hidden`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-3 sm:p-4 flex flex-col items-center text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `text-3xl mb-1`, children: rankBadge(place) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Avatar, { className: "w-12 h-12 mb-2 ring-2 ring-offset-2 ring-offset-slate-800 ring-indigo-500", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarImage, { src: entry.avatarUrl }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: `bg-gradient-to-br ${colors[idx]} text-white`, children: initials(entry.fullName, entry.username) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold truncate w-full", children: entry.username })
        ] }) }, entry.userId);
      }) }) : null,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-slate-800 border-slate-700 text-slate-100", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0 divide-y divide-slate-700", children: isLoading ? Array.from({
        length: 8
      }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 bg-slate-700" }) }, i)) : entries.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-8 text-center text-slate-400", children: "No entries yet." }) : entries.map((e, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(LeaderboardRow, { entry: e, isMe: e.userId === me?.id, type, index: i }, e.userId)) }) })
    ] })
  ] });
}
function LeaderboardRow({
  entry,
  isMe,
  type,
  index
}) {
  const rank = entry.rank ?? index + 1;
  const studyHours = ((entry.totalStudyMinutes ?? 0) / 60).toFixed(1);
  const value = type === "xp" ? `${entry.xpPoints ?? 0} XP` : `${entry.currentStreak ?? 0} 🔥`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex items-center gap-3 sm:gap-4 p-3 sm:p-4 transition-colors hover:bg-slate-700/40 animate-in fade-in slide-in-from-bottom-1 ${isMe ? "border-l-4 border-indigo-500 bg-indigo-500/5" : ""}`, style: {
    animationDelay: `${index * 30}ms`,
    animationFillMode: "both"
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 text-center text-lg font-bold text-slate-200", children: rankBadge(rank) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Avatar, { className: "w-10 h-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarImage, { src: entry.avatarUrl }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "bg-indigo-600 text-white", children: initials(entry.fullName, entry.username) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-medium truncate", children: [
        entry.username,
        isMe && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-indigo-400 text-xs ml-2", children: "(you)" })
      ] }),
      entry.fullName && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-400 truncate", children: entry.fullName })
    ] }),
    entry.level != null && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "bg-slate-700 text-slate-200 hidden sm:inline-flex", children: [
      "Lvl ",
      entry.level
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-indigo-300", children: value }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-slate-400", children: [
        studyHours,
        "h studied"
      ] })
    ] })
  ] });
}
const SplitComponent = () => /* @__PURE__ */ jsxRuntimeExports.jsx(ProtectedRoute, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(LeaderboardPage, {}) });
export {
  SplitComponent as component
};
