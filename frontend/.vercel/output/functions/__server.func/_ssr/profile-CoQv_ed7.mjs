import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { A as AppNavbar, a as Avatar, b as AvatarImage, c as AvatarFallback } from "./AppNavbar-JiN83LSY.mjs";
import { P as ProtectedRoute } from "./ProtectedRoute-DGZFG5uG.mjs";
import { C as Card, a as CardContent, b as CardHeader, c as CardTitle } from "./card-CPilEoFz.mjs";
import { S as Skeleton } from "./skeleton-F-7As_y7.mjs";
import { R as Root, I as Indicator } from "../_libs/radix-ui__react-progress.mjs";
import { c as cn } from "./button-BXrfXN_b.mjs";
import { a as analyticsService } from "./analyticsService-BQjub-Zu.mjs";
import { a as authService } from "./authService-D2zzAqrm.mjs";
import "../_libs/react-hot-toast.mjs";
import "../_libs/sockjs-client.mjs";
import { C as Clock, a as Target, F as Flame, b as Trophy, Z as Zap, U as Users, c as Lock, d as Calendar } from "../_libs/lucide-react.mjs";
import { f as format } from "../_libs/date-fns.mjs";
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
import "../_libs/goober.mjs";
import "../_libs/stomp__stompjs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
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
const Progress = reactExports.forwardRef(({ className, value, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Root,
  {
    ref,
    className: cn("relative h-2 w-full overflow-hidden rounded-full bg-primary/20", className),
    ...props,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Indicator,
      {
        className: "h-full w-full flex-1 bg-primary transition-all",
        style: { transform: `translateX(-${100 - (value || 0)}%)` }
      }
    )
  }
));
Progress.displayName = Root.displayName;
const ALL_BADGES = [{
  code: "FIRST_SESSION",
  icon: "🎯",
  name: "First Steps",
  description: "Complete your first study session"
}, {
  code: "STREAK_3",
  icon: "🔥",
  name: "On Fire",
  description: "Maintain a 3-day study streak"
}, {
  code: "STREAK_7",
  icon: "⚡",
  name: "Week Warrior",
  description: "Maintain a 7-day study streak"
}, {
  code: "STREAK_30",
  icon: "🏆",
  name: "Unstoppable",
  description: "Maintain a 30-day streak"
}, {
  code: "HOURS_10",
  icon: "⏰",
  name: "Dedicated",
  description: "Study for 10 total hours"
}, {
  code: "HOURS_50",
  icon: "📚",
  name: "Scholar",
  description: "Study for 50 total hours"
}, {
  code: "HOURS_100",
  icon: "🎓",
  name: "Master",
  description: "Study for 100 total hours"
}, {
  code: "ROOMS_5",
  icon: "🤝",
  name: "Collaborator",
  description: "Join 5 different rooms"
}, {
  code: "LEVEL_5",
  icon: "⭐",
  name: "Rising Star",
  description: "Reach level 5"
}, {
  code: "LEVEL_10",
  icon: "🌟",
  name: "Elite",
  description: "Reach level 10"
}];
function initials(name, fallback) {
  const s = (name || fallback || "?").trim();
  const parts = s.split(/\s+/);
  return ((parts[0]?.[0] || "") + (parts[1]?.[0] || "")).toUpperCase() || s[0]?.toUpperCase() || "?";
}
function ProfilePage() {
  const {
    data: user
  } = useQuery({
    queryKey: ["auth", "me"],
    queryFn: authService.getCurrentUser
  });
  const {
    data: stats,
    isLoading
  } = useQuery({
    queryKey: ["analytics", "me"],
    queryFn: analyticsService.me
  });
  const level = stats?.level ?? 1;
  const xp = stats?.xpPoints ?? 0;
  const nextLevelXP = level * 200;
  const prevLevelXP = (level - 1) * 200;
  const progressInLevel = Math.max(0, xp - prevLevelXP);
  const levelSpan = Math.max(1, nextLevelXP - prevLevelXP);
  const pct = Math.min(100, Math.round(progressInLevel / levelSpan * 100));
  const earnedBadges = new Map((stats?.badges || []).map((b) => [b.code, b]));
  const totalHours = ((stats?.totalStudyMinutes ?? 0) / 60).toFixed(1);
  const statCards = [{
    icon: Clock,
    label: "Study Hours",
    value: totalHours
  }, {
    icon: Target,
    label: "Sessions",
    value: stats?.totalSessions ?? 0
  }, {
    icon: Flame,
    label: "Current Streak",
    value: `${stats?.currentStreak ?? 0}d`
  }, {
    icon: Trophy,
    label: "Longest Streak",
    value: `${stats?.longestStreak ?? 0}d`
  }, {
    icon: Zap,
    label: "XP Points",
    value: stats?.xpPoints ?? 0
  }, {
    icon: Users,
    label: "Rooms Joined",
    value: stats?.roomsJoined ?? 0
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-slate-900 text-slate-100", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AppNavbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-slate-800 border-slate-700 text-slate-100", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-6 flex flex-col sm:flex-row items-center gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Avatar, { className: "w-24 h-24 ring-4 ring-indigo-500/40", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarImage, { src: user?.avatarUrl }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "bg-indigo-600 text-white text-2xl", children: initials(user?.fullName, user?.username) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 text-center sm:text-left", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold", children: user?.fullName || user?.username || "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-slate-400", children: [
            "@",
            user?.username
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-500 text-sm", children: user?.email })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full sm:w-64", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-indigo-300", children: [
              "Level ",
              level
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-slate-400", children: [
              progressInLevel,
              " / ",
              levelSpan,
              " XP"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: pct, className: "h-2 bg-slate-700" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-slate-500 mt-1", children: [
            Math.max(0, nextLevelXP - xp),
            " XP to level ",
            level + 1
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-4", children: statCards.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-slate-800 border-slate-700 text-slate-100", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 rounded-lg bg-indigo-500/15 text-indigo-300", children: /* @__PURE__ */ jsxRuntimeExports.jsx(s.icon, { className: "w-5 h-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-400", children: s.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-bold", children: isLoading ? "…" : s.value })
        ] })
      ] }) }, s.label)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-slate-800 border-slate-700 text-slate-100", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Your Badges" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3", children: ALL_BADGES.map((b) => {
          const earned = earnedBadges.get(b.code);
          const isEarned = !!earned;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `relative rounded-lg p-4 border text-center transition ${isEarned ? "bg-slate-900 border-indigo-500/40" : "bg-slate-900/50 border-slate-700 opacity-50 grayscale"}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl mb-1", children: b.icon }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold", children: b.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-400 mt-1", children: b.description }),
            isEarned ? earned?.earnedAt && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-indigo-400 mt-2", children: format(new Date(earned.earnedAt), "MMM d, yyyy") }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-3 h-3 absolute top-2 right-2 text-slate-500" })
          ] }, b.code);
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-slate-800 border-slate-700 text-slate-100", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-4 h-4" }),
          " Recent Sessions"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-2", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 bg-slate-700" }) : (stats?.recentSessions?.length ?? 0) === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400 text-sm", children: "No recent sessions yet." }) : stats.recentSessions.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-3 rounded-lg bg-slate-900 border border-slate-700", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: s.roomName || "Study Session" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-400", children: s.startedAt ? format(new Date(s.startedAt), "PPp") : "" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-indigo-300", children: [
            Math.round(s.durationMinutes ?? 0),
            " min"
          ] })
        ] }, i)) })
      ] })
    ] })
  ] });
}
const SplitComponent = () => /* @__PURE__ */ jsxRuntimeExports.jsx(ProtectedRoute, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ProfilePage, {}) });
export {
  SplitComponent as component
};
