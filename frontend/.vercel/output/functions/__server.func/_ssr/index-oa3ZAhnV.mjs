import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { B as Button } from "./button-BXrfXN_b.mjs";
import { A as ArrowRight, M as MessageSquare, l as Bot, m as Timer, n as FileText, b as Trophy, a as Target, G as GraduationCap } from "../_libs/lucide-react.mjs";
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
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
function Navbar() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "sticky top-0 z-50 w-full border-b border-border/40 bg-background/70 backdrop-blur-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto flex h-16 items-center justify-between px-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2 group", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-9 w-9 items-center justify-center rounded-lg bg-[image:var(--gradient-brand)] shadow-[var(--shadow-glow)] transition-transform group-hover:scale-110", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "h-5 w-5 text-white" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg font-bold tracking-tight", children: "CollabStudy" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "ghost", size: "sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", children: "Login" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "sm", className: "bg-[image:var(--gradient-brand)] text-white hover:opacity-90", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/register", children: "Register" }) })
    ] })
  ] }) });
}
function Footer() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "border-t border-border/40 mt-24", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
      "© ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      " CollabStudy. Study together, achieve more."
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "flex gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "hover:text-foreground transition-colors", children: "Home" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/rooms", className: "hover:text-foreground transition-colors", children: "Rooms" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/leaderboard", className: "hover:text-foreground transition-colors", children: "Leaderboard" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", className: "hover:text-foreground transition-colors", children: "Privacy" })
    ] })
  ] }) });
}
const features = [{
  icon: MessageSquare,
  emoji: "💬",
  title: "Real-time Chat",
  desc: "Collaborate with roommates instantly"
}, {
  icon: Bot,
  emoji: "🤖",
  title: "AI Study Assistant",
  desc: "Get explanations, quizzes, and summaries"
}, {
  icon: Timer,
  emoji: "⏱️",
  title: "Focus Timer",
  desc: "Track your study sessions"
}, {
  icon: FileText,
  emoji: "📝",
  title: "Shared Notes",
  desc: "Edit notes together in real-time"
}, {
  icon: Trophy,
  emoji: "🏆",
  title: "Gamification",
  desc: "Earn XP, badges, and climb the leaderboard"
}, {
  icon: Target,
  emoji: "🎯",
  title: "Smart Rooms",
  desc: "Find rooms matching your subject and goal"
}];
const stats = [{
  value: "10,000+",
  label: "Students"
}, {
  value: "500+",
  label: "Study Rooms"
}, {
  value: "1M+",
  label: "Minutes Studied"
}];
function LandingPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "aria-hidden": true, className: "pointer-events-none absolute inset-0 -z-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-[-10%] left-[-10%] h-[420px] w-[420px] rounded-full bg-indigo-500/30 blur-3xl animate-[float_8s_ease-in-out_infinite]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-[20%] right-[-10%] h-[480px] w-[480px] rounded-full bg-violet-500/30 blur-3xl animate-[float_12s_ease-in-out_infinite]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-[-20%] left-[30%] h-[420px] w-[420px] rounded-full bg-fuchsia-500/20 blur-3xl animate-[float_10s_ease-in-out_infinite]" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 pt-24 pb-20 md:pt-32 md:pb-28 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/50 px-4 py-1.5 text-xs text-muted-foreground backdrop-blur animate-[fade-up_0.6s_ease-out_both]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" }),
          "New: AI Study Assistant is live"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-6 text-5xl md:text-7xl font-bold tracking-tight animate-[fade-up_0.7s_ease-out_both]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent", children: "Study Together," }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent", children: "Achieve More" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto mt-6 max-w-2xl text-lg md:text-xl text-muted-foreground animate-[fade-up_0.8s_ease-out_both]", children: "Join virtual study rooms, collaborate in real-time, and level up your learning with AI assistance." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 animate-[fade-up_0.9s_ease-out_both]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "lg", className: "bg-[image:var(--gradient-brand)] text-white shadow-[var(--shadow-glow)] hover:opacity-90 h-12 px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/register", children: [
            "Get Started Free ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "ml-1 h-4 w-4" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "lg", variant: "outline", className: "h-12 px-6 border-border/70 bg-card/40 backdrop-blur", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/rooms", children: "Browse Rooms" }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4 rounded-2xl border border-border/60 bg-card/60 backdrop-blur p-8 shadow-2xl", children: stats.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent", children: s.value }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-sm text-muted-foreground uppercase tracking-wider", children: s.label })
    ] }, s.label)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "container mx-auto px-4 py-24", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto text-center mb-14", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl md:text-5xl font-bold tracking-tight", children: "Everything you need to focus" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-muted-foreground text-lg", children: "A complete toolkit built for students, by students." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5", children: features.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group relative rounded-2xl border border-border/60 bg-card/60 backdrop-blur p-6 transition-all hover:border-primary/50 hover:-translate-y-1 hover:shadow-[var(--shadow-glow)]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-12 w-12 items-center justify-center rounded-xl bg-[image:var(--gradient-brand)]/20 text-2xl", children: f.emoji }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold", children: f.title })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-muted-foreground", children: f.desc }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(f.icon, { className: "absolute right-5 top-5 h-4 w-4 text-muted-foreground/40 group-hover:text-primary transition-colors" })
      ] }, f.title)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
export {
  LandingPage as component
};
