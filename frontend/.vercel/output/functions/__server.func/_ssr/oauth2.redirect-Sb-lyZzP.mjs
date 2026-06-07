import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { z as zt } from "../_libs/react-hot-toast.mjs";
import { a as authService } from "./authService-D2zzAqrm.mjs";
import { u as useAuthStore } from "./router-Bov4sYtq.mjs";
import { L as LoaderCircle } from "../_libs/lucide-react.mjs";
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
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
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
function OAuthRedirect() {
  const navigate = useNavigate();
  const {
    setToken,
    setUser
  } = useAuthStore();
  reactExports.useEffect(() => {
    console.log("CURRENT URL =", window.location.href);
    const params = new URLSearchParams(window.location.search);
    console.log("TOKEN =", params.get("token"));
    console.log("REFRESH =", params.get("refreshToken"));
    console.log("ERROR =", params.get("error"));
    const token = params.get("token");
    const refreshToken = params.get("refreshToken");
    const error = params.get("error");
    if (error || !token) {
      zt.error(error || "OAuth login failed");
      navigate({
        to: "/login"
      });
      return;
    }
    localStorage.setItem("access_token", token);
    if (refreshToken) localStorage.setItem("refresh_token", refreshToken);
    setToken(token);
    authService.getCurrentUser().then((user) => {
      setUser(user);
      zt.success("Signed in!");
      navigate({
        to: "/dashboard"
      });
    }).catch(() => {
      zt.error("Failed to fetch profile");
      navigate({
        to: "/login"
      });
    });
  }, [navigate, setToken, setUser]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-slate-900", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin text-indigo-500" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-400", children: "Signing you in..." })
  ] }) });
}
export {
  OAuthRedirect as component
};
