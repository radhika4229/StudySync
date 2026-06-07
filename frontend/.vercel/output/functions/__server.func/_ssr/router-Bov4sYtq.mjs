import { b as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { c as createRouter, a as createRootRouteWithContext, u as useRouter, L as Link, O as Outlet, H as HeadContent, S as Scripts, b as createFileRoute, l as lazyRouteComponent } from "../_libs/tanstack__react-router.mjs";
import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { F as Fe } from "../_libs/react-hot-toast.mjs";
import { a as axios } from "../_libs/axios.mjs";
import { c as create } from "../_libs/zustand.mjs";
import { T as TriangleAlert } from "../_libs/lucide-react.mjs";
import { o as object, s as string, l as literal, n as number, b as boolean } from "../_libs/zod.mjs";
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
import "../_libs/goober.mjs";
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
const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
  setUser: (user) => {
    if (typeof window !== "undefined") {
      if (user) localStorage.setItem("user", JSON.stringify(user));
      else localStorage.removeItem("user");
    }
    set((s) => ({ user, isAuthenticated: !!user && !!s.token }));
  },
  setToken: (token) => {
    if (typeof window !== "undefined") {
      if (token) localStorage.setItem("access_token", token);
      else localStorage.removeItem("access_token");
    }
    set((s) => ({ token, isAuthenticated: !!token && !!s.user }));
  },
  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user");
    }
    set({ user: null, token: null, isAuthenticated: false, isLoading: false });
  },
  initialize: () => {
    if (typeof window === "undefined") {
      set({ isLoading: false });
      return;
    }
    const token = localStorage.getItem("access_token");
    const userStr = localStorage.getItem("user");
    let user = null;
    try {
      user = userStr ? JSON.parse(userStr) : null;
    } catch {
      user = null;
    }
    set({
      token,
      user,
      isAuthenticated: !!token && !!user,
      isLoading: false
    });
  }
}));
const API_BASE_URL = "https://your-backend.onrender.com/api";
const WS_BASE_URL = "https://your-backend.onrender.com/ws";
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" }
});
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("access_token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
let isRefreshing = false;
let pendingQueue = [];
const flushQueue = (token) => {
  pendingQueue.forEach((cb) => cb(token));
  pendingQueue = [];
};
const forceLogout = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("user");
  if (!window.location.pathname.startsWith("/login")) {
    window.location.href = "/login";
  }
};
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    const status = error.response?.status;
    if (status !== 401 || !original || original._retry || typeof window === "undefined" || (original.url || "").includes("/auth/refresh") || (original.url || "").includes("/auth/login")) {
      if (status === 401 && typeof window !== "undefined") forceLogout();
      return Promise.reject(error);
    }
    const refreshToken = localStorage.getItem("refresh_token");
    if (!refreshToken) {
      forceLogout();
      return Promise.reject(error);
    }
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        pendingQueue.push((token) => {
          if (!token) return reject(error);
          original._retry = true;
          original.headers = { ...original.headers || {}, Authorization: `Bearer ${token}` };
          resolve(api(original));
        });
      });
    }
    original._retry = true;
    isRefreshing = true;
    try {
      const { data } = await axios.post(
        `${API_BASE_URL}/auth/refresh`,
        null,
        { params: { refreshToken } }
      );
      const newToken = data?.accessToken;
      const newRefresh = data?.refreshToken;
      if (!newToken) throw new Error("No accessToken in refresh response");
      localStorage.setItem("access_token", newToken);
      if (newRefresh) localStorage.setItem("refresh_token", newRefresh);
      flushQueue(newToken);
      original.headers = { ...original.headers || {}, Authorization: `Bearer ${newToken}` };
      return api(original);
    } catch (e) {
      flushQueue(null);
      forceLogout();
      return Promise.reject(e);
    } finally {
      isRefreshing = false;
    }
  }
);
const HEALTH_URL = API_BASE_URL.replace(/\/api\/?$/, "") + "/actuator/health";
function BackendHealthBanner() {
  const [offline, setOffline] = reactExports.useState(false);
  reactExports.useEffect(() => {
    let cancelled = false;
    const check = async () => {
      try {
        const ctrl = new AbortController();
        const t = setTimeout(() => ctrl.abort(), 5e3);
        const res = await fetch(HEALTH_URL, { signal: ctrl.signal });
        clearTimeout(t);
        if (!cancelled) setOffline(!res.ok);
      } catch {
        if (!cancelled) setOffline(true);
      }
    };
    check();
    const id = setInterval(check, 3e4);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);
  if (!offline) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky top-0 z-[60] flex items-center justify-center gap-2 border-b border-red-500/30 bg-red-500/15 px-4 py-2 text-sm font-medium text-red-200 backdrop-blur", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-4 w-4" }),
    "Backend offline — some features may not work."
  ] });
}
const appCss = "/assets/styles-BXbn5eO8.css";
function reportLovableError(error, context = {}) {
  if (typeof window === "undefined") return;
  window.__lovableEvents?.captureException?.(
    error,
    {
      source: "react_error_boundary",
      route: window.location.pathname,
      ...context
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error"
    }
  );
}
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Go home"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  reactExports.useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold tracking-tight text-foreground", children: "This page didn't load" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something went wrong on our end. You can try refreshing or head back home." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const Route$b = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Lovable App" },
      { name: "description", content: "Lovable Generated Project" },
      { name: "author", content: "Lovable" },
      { property: "og:title", content: "Lovable App" },
      { property: "og:description", content: "Lovable Generated Project" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" }
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$b.useRouteContext();
  const initialize = useAuthStore((s) => s.initialize);
  reactExports.useEffect(() => {
    initialize();
  }, [initialize]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(QueryClientProvider, { client: queryClient, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(BackendHealthBanner, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Fe, { position: "top-right", toastOptions: { style: { background: "#1e293b", color: "#fff", border: "1px solid rgba(255,255,255,0.1)" } } })
  ] });
}
const $$splitComponentImporter$a = () => import("./register-XRu4dnhj.mjs");
object({
  fullName: string().min(2, "Required"),
  username: string().min(3, "Min 3 characters"),
  email: string().email("Invalid email"),
  password: string().min(6, "Min 6 characters"),
  confirmPassword: string()
}).refine((d) => d.password === d.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});
const Route$a = createFileRoute("/register")({
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const $$splitComponentImporter$9 = () => import("./profile-CoQv_ed7.mjs");
const Route$9 = createFileRoute("/profile")({
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("./notifications-BFSVzn1K.mjs");
const Route$8 = createFileRoute("/notifications")({
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./login-BcdgyLHC.mjs");
object({
  email: string().email("Invalid email"),
  password: string().min(6, "Min 6 characters")
});
const Route$7 = createFileRoute("/login")({
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./leaderboard-CzuzTakB.mjs");
const Route$6 = createFileRoute("/leaderboard")({
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./dashboard-CYVQG1sB.mjs");
const Route$5 = createFileRoute("/dashboard")({
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./index-oa3ZAhnV.mjs");
const Route$4 = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "CollabStudy — Study Together, Achieve More"
    }, {
      name: "description",
      content: "Join virtual study rooms, collaborate in real-time, and level up your learning with AI assistance."
    }, {
      property: "og:title",
      content: "CollabStudy — Study Together, Achieve More"
    }, {
      property: "og:description",
      content: "Virtual study rooms with real-time chat, AI assistance, and gamified learning."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./rooms.index-Fs6r0wkI.mjs");
const Route$3 = createFileRoute("/rooms/")({
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./rooms.create-WadPCYuV.mjs");
const Route$2 = createFileRoute("/rooms/create")({
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
object({
  name: string().min(1, "Required").max(100, "Max 100 characters"),
  subject: string().min(1, "Subject is required"),
  topic: string().max(120).optional().or(literal("")),
  description: string().max(500, "Max 500 characters").optional().or(literal("")),
  isPublic: boolean(),
  maxParticipants: number().min(2).max(50),
  passwordProtected: boolean(),
  password: string().optional().or(literal(""))
}).refine((d) => !d.passwordProtected || d.password && d.password.length >= 4, {
  message: "Password must be at least 4 characters",
  path: ["password"]
});
const $$splitComponentImporter$1 = () => import("./rooms._roomId-FfDR8isg.mjs");
const Route$1 = createFileRoute("/rooms/$roomId")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./oauth2.redirect-Sb-lyZzP.mjs");
const Route = createFileRoute("/oauth2/redirect")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const RegisterRoute = Route$a.update({
  id: "/register",
  path: "/register",
  getParentRoute: () => Route$b
});
const ProfileRoute = Route$9.update({
  id: "/profile",
  path: "/profile",
  getParentRoute: () => Route$b
});
const NotificationsRoute = Route$8.update({
  id: "/notifications",
  path: "/notifications",
  getParentRoute: () => Route$b
});
const LoginRoute = Route$7.update({
  id: "/login",
  path: "/login",
  getParentRoute: () => Route$b
});
const LeaderboardRoute = Route$6.update({
  id: "/leaderboard",
  path: "/leaderboard",
  getParentRoute: () => Route$b
});
const DashboardRoute = Route$5.update({
  id: "/dashboard",
  path: "/dashboard",
  getParentRoute: () => Route$b
});
const IndexRoute = Route$4.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$b
});
const RoomsIndexRoute = Route$3.update({
  id: "/rooms/",
  path: "/rooms/",
  getParentRoute: () => Route$b
});
const RoomsCreateRoute = Route$2.update({
  id: "/rooms/create",
  path: "/rooms/create",
  getParentRoute: () => Route$b
});
const RoomsRoomIdRoute = Route$1.update({
  id: "/rooms/$roomId",
  path: "/rooms/$roomId",
  getParentRoute: () => Route$b
});
const Oauth2RedirectRoute = Route.update({
  id: "/oauth2/redirect",
  path: "/oauth2/redirect",
  getParentRoute: () => Route$b
});
const rootRouteChildren = {
  IndexRoute,
  DashboardRoute,
  LeaderboardRoute,
  LoginRoute,
  NotificationsRoute,
  ProfileRoute,
  RegisterRoute,
  Oauth2RedirectRoute,
  RoomsRoomIdRoute,
  RoomsCreateRoute,
  RoomsIndexRoute
};
const routeTree = Route$b._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  API_BASE_URL as A,
  Route$1 as R,
  WS_BASE_URL as W,
  api as a,
  router as r,
  useAuthStore as u
};
