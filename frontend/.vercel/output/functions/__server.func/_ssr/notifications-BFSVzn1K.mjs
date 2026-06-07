import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { a as useQueryClient, u as useQuery, b as useMutation } from "../_libs/tanstack__react-query.mjs";
import { A as AppNavbar, n as notificationService } from "./AppNavbar-JiN83LSY.mjs";
import { P as ProtectedRoute } from "./ProtectedRoute-DGZFG5uG.mjs";
import { B as Button, c as cn } from "./button-BXrfXN_b.mjs";
import { C as Card } from "./card-CPilEoFz.mjs";
import { S as Skeleton } from "./skeleton-F-7As_y7.mjs";
import "../_libs/react-hot-toast.mjs";
import "../_libs/sockjs-client.mjs";
import { e as CheckCheck, B as BellOff } from "../_libs/lucide-react.mjs";
import { H as formatDistanceToNow } from "../_libs/date-fns.mjs";
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
import "./authService-D2zzAqrm.mjs";
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
const TYPE_ICONS = {
  SESSION_START: "🚀",
  BADGE_EARNED: "🏅",
  XP_EARNED: "⭐",
  FRIEND_JOINED: "🤝",
  TASK_ASSIGNED: "✅"
};
function NotificationsPage() {
  const qc = useQueryClient();
  const {
    data: notifications = [],
    isLoading
  } = useQuery({
    queryKey: ["notifications", "list"],
    queryFn: notificationService.list
  });
  const sorted = [...notifications].sort((a, b) => {
    const ta = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const tb = b.createdAt ? new Date(b.createdAt).getTime() : 0;
    return tb - ta;
  });
  const markRead = useMutation({
    mutationFn: (id) => notificationService.markRead(id),
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["notifications"]
      });
    }
  });
  const markAll = useMutation({
    mutationFn: notificationService.markAllRead,
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["notifications"]
      });
    }
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-slate-900 text-slate-100", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AppNavbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "max-w-3xl mx-auto px-4 sm:px-6 py-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-center justify-between mb-6 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl sm:text-3xl font-bold", children: "Notifications" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400 text-sm", children: "Stay up to date with your study activity." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "border-slate-700 bg-slate-800 text-slate-100 hover:bg-slate-700", onClick: () => markAll.mutate(), disabled: markAll.isPending || sorted.every((n) => n.read), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CheckCheck, { className: "w-4 h-4 mr-2" }),
          " Mark all read"
        ] })
      ] }),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: Array.from({
        length: 5
      }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 bg-slate-800" }, i)) }) : sorted.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-slate-800 border-slate-700 text-center py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3 text-slate-400", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(BellOff, { className: "w-12 h-12 text-slate-600" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-medium text-slate-200", children: "You're all caught up!" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "New notifications will show up here." })
      ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: sorted.map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(NotificationRow, { n, onClick: () => {
        if (!n.read) markRead.mutate(n.id);
      } }, n.id)) })
    ] })
  ] });
}
function NotificationRow({
  n,
  onClick
}) {
  const icon = TYPE_ICONS[n.type] ?? "🔔";
  const time = n.createdAt ? formatDistanceToNow(new Date(n.createdAt), {
    addSuffix: true
  }) : "";
  return /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick, className: cn("w-full text-left rounded-lg p-4 border transition-all flex gap-3 items-start hover:scale-[1.01]", n.read ? "bg-slate-800 border-slate-700 opacity-70" : "bg-slate-700 border-l-4 border-l-indigo-500 border-slate-600"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl flex-shrink-0", children: icon }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-slate-100 truncate", children: n.title || n.type || "Notification" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-300 mt-0.5 break-words", children: n.message }),
      time && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500 mt-1", children: time })
    ] }),
    !n.read && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-indigo-400 mt-2 flex-shrink-0" })
  ] }) });
}
const SplitComponent = () => /* @__PURE__ */ jsxRuntimeExports.jsx(ProtectedRoute, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(NotificationsPage, {}) });
export {
  SplitComponent as component
};
