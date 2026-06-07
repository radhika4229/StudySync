import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { B as Button } from "./button-BXrfXN_b.mjs";
import { A as API_BASE_URL } from "./router-Bov4sYtq.mjs";
import { f as Github } from "../_libs/lucide-react.mjs";
const OAUTH_BASE = API_BASE_URL.replace(/\/api\/?$/, "");
const REDIRECT_URI = "http://localhost:8081/oauth2/redirect";
function OAuthButtons() {
  const google = `${OAUTH_BASE}/oauth2/authorize/google?redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;
  const github = `${OAUTH_BASE}/oauth2/authorize/github?redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        asChild: true,
        variant: "outline",
        className: "border-slate-700 bg-slate-900/60 text-slate-200 hover:bg-slate-800 hover:text-white",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: google, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "h-4 w-4", viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "path",
            {
              fill: "#EA4335",
              d: "M12 10.2v3.9h5.5c-.2 1.4-1.6 4-5.5 4-3.3 0-6-2.7-6-6.1s2.7-6.1 6-6.1c1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.8 3.3 14.6 2.3 12 2.3 6.9 2.3 2.8 6.4 2.8 11.5S6.9 20.7 12 20.7c6.9 0 9.2-4.9 9.2-7.4 0-.5 0-.9-.1-1.3H12z"
            }
          ) }),
          "Google"
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        asChild: true,
        variant: "outline",
        className: "border-slate-700 bg-slate-900/60 text-slate-200 hover:bg-slate-800 hover:text-white",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: github, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Github, { className: "h-4 w-4" }),
          "GitHub"
        ] })
      }
    )
  ] });
}
export {
  OAuthButtons as O
};
