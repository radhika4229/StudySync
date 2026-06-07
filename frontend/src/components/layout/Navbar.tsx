import { Link } from "@tanstack/react-router";
import { GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/70 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[image:var(--gradient-brand)] shadow-[var(--shadow-glow)] transition-transform group-hover:scale-110">
            <GraduationCap className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight">CollabStudy</span>
        </Link>
        <nav className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm">
            <Link to="/login">Login</Link>
          </Button>
          <Button asChild size="sm" className="bg-[image:var(--gradient-brand)] text-white hover:opacity-90">
            <Link to="/register">Register</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
