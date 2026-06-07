import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowRight, MessageSquare, Bot, Timer, FileText, Trophy, Target } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CollabStudy — Study Together, Achieve More" },
      { name: "description", content: "Join virtual study rooms, collaborate in real-time, and level up your learning with AI assistance." },
      { property: "og:title", content: "CollabStudy — Study Together, Achieve More" },
      { property: "og:description", content: "Virtual study rooms with real-time chat, AI assistance, and gamified learning." },
    ],
  }),
  component: LandingPage,
});

const features = [
  { icon: MessageSquare, emoji: "💬", title: "Real-time Chat", desc: "Collaborate with roommates instantly" },
  { icon: Bot, emoji: "🤖", title: "AI Study Assistant", desc: "Get explanations, quizzes, and summaries" },
  { icon: Timer, emoji: "⏱️", title: "Focus Timer", desc: "Track your study sessions" },
  { icon: FileText, emoji: "📝", title: "Shared Notes", desc: "Edit notes together in real-time" },
  { icon: Trophy, emoji: "🏆", title: "Gamification", desc: "Earn XP, badges, and climb the leaderboard" },
  { icon: Target, emoji: "🎯", title: "Smart Rooms", desc: "Find rooms matching your subject and goal" },
];

const stats = [
  { value: "10,000+", label: "Students" },
  { value: "500+", label: "Study Rooms" },
  { value: "1M+", label: "Minutes Studied" },
];

function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Floating gradient orbs */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute top-[-10%] left-[-10%] h-[420px] w-[420px] rounded-full bg-indigo-500/30 blur-3xl animate-[float_8s_ease-in-out_infinite]" />
          <div className="absolute top-[20%] right-[-10%] h-[480px] w-[480px] rounded-full bg-violet-500/30 blur-3xl animate-[float_12s_ease-in-out_infinite]" />
          <div className="absolute bottom-[-20%] left-[30%] h-[420px] w-[420px] rounded-full bg-fuchsia-500/20 blur-3xl animate-[float_10s_ease-in-out_infinite]" />
        </div>

        <div className="container mx-auto px-4 pt-24 pb-20 md:pt-32 md:pb-28 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/50 px-4 py-1.5 text-xs text-muted-foreground backdrop-blur animate-[fade-up_0.6s_ease-out_both]">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            New: AI Study Assistant is live
          </div>

          <h1 className="mt-6 text-5xl md:text-7xl font-bold tracking-tight animate-[fade-up_0.7s_ease-out_both]">
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              Study Together,
            </span>
            <br />
            <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
              Achieve More
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg md:text-xl text-muted-foreground animate-[fade-up_0.8s_ease-out_both]">
            Join virtual study rooms, collaborate in real-time, and level up your learning with AI assistance.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 animate-[fade-up_0.9s_ease-out_both]">
            <Button asChild size="lg" className="bg-[image:var(--gradient-brand)] text-white shadow-[var(--shadow-glow)] hover:opacity-90 h-12 px-6">
              <Link to="/register">
                Get Started Free <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 px-6 border-border/70 bg-card/40 backdrop-blur">
              <Link to="/rooms">Browse Rooms</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 rounded-2xl border border-border/60 bg-card/60 backdrop-blur p-8 shadow-2xl">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                {s.value}
              </div>
              <div className="mt-1 text-sm text-muted-foreground uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-24">
        <div className="max-w-2xl mx-auto text-center mb-14">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Everything you need to focus</h2>
          <p className="mt-4 text-muted-foreground text-lg">
            A complete toolkit built for students, by students.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f) => (
            <div
              key={f.title}
              className="group relative rounded-2xl border border-border/60 bg-card/60 backdrop-blur p-6 transition-all hover:border-primary/50 hover:-translate-y-1 hover:shadow-[var(--shadow-glow)]"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[image:var(--gradient-brand)]/20 text-2xl">
                  {f.emoji}
                </div>
                <h3 className="text-lg font-semibold">{f.title}</h3>
              </div>
              <p className="mt-4 text-muted-foreground">{f.desc}</p>
              <f.icon className="absolute right-5 top-5 h-4 w-4 text-muted-foreground/40 group-hover:text-primary transition-colors" />
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
